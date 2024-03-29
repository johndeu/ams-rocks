import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential, ManagedIdentityCredential } from '@azure/identity';
import { AzureMediaServices, KnownLiveEventResourceState, LiveEvent } from '@azure/arm-mediaservices';
import { AbortController } from '@azure/abort-controller';
const fs = require('fs');

// This is the main Media Services client object
let mediaServicesClient: AzureMediaServices;
// Long running operation polling interval in milliseconds
const longRunningOperationUpdateIntervalMs = 1000;

// Copy the samples.env file and rename it to .env first, then populate it's values with the values obtained 
// from your Media Services account's API Access page in the Azure portal.
const subscriptionId: string = process.env.AZURE_SUBSCRIPTION_ID as string;
const resourceGroup: string = process.env.AZURE_RESOURCE_GROUP as string;
const accountPool: account[] = JSON.parse(process.env.ACCOUNT_POOL);
const managedIdentityClientId: string = process.env.USER_MANAGED_IDENTITY_CLIENT_ID as string

// const credential = new ManagedIdentityCredential("<USER_ASSIGNED_MANAGED_IDENTITY_CLIENT_ID>");
const credential = new DefaultAzureCredential({
    managedIdentityClientId: managedIdentityClientId
});

// Object to return
interface liveStream {
    name: string,
    status: string,
    createdAt: Date,
    protocol: string,
    streamKey: string,
    latencyMode: string,
    location: string,
}

interface account {
    name: string,
    location: string,
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    console.log('HTTP trigger - Livestream getAvailable');
    console.log("Getting the client for Media Services");

    let continent: string | undefined;
    let regionMap: any;

    if (req.method == "PUT") {
        continent = req.body.continent;
        console.log(`Request contains continent: ${continent}`)

        try {
            var contents = fs.readFileSync('./livestream-getavailable/continentToRegion.json')
            regionMap = JSON.parse(contents)
        } catch (err) {
            console.log(`Failed to load JSON ${err}`)
        }
    }

    try {
        mediaServicesClient = new AzureMediaServices(credential, subscriptionId)
        console.log(`Got the AMS client with Managed ID : ${managedIdentityClientId} `);
    } catch (err) {
        console.log(`Error retrieving Media Services Client.`);
        console.error(err);
    }

    if (req.method == "PUT") {
        console.log("Getting available live events from AMS accounts");

        let regionsToSearch: String[] | undefined
        if (continent) {
            regionMap.forEach(item => {
                if (item.continent == continent) {
                    if (item.regions.length > 0)
                        regionsToSearch = item.regions;
                    console.log(`Found accounts in continent: ${item.continent}`)
                }

            });
        }

        if (!regionsToSearch)
        {
            console.log("No regions for this continent.")
            context.res = {
                status: 400,
                body : {
                    "message": "No demo regions available in the continent provided at this time.",
                    "code": 400
                }
            }
            return;
        }

        console.log(`listing live stream`);
        await listAvailableStreams(regionsToSearch).then(liveStreams => {
            if (liveStreams.length > 0) {
                context.res = {
                    status: 200, /* Defaults to 200 */
                    body: liveStreams
                };
            } else {
                context.res = {
                    status: 400,
                    body: {
                        "message": "No live streams available at this time. Try again later.",
                        "code": 404
                    }
                }
            }
        }).catch((err) => {
            console.log(`Error getting the live streams ${err}`);
        });


    }

};

async function listAvailableStreams(regionsToSearch: String[]): Promise<liveStream[]> {
    console.log("Listing available live streams");

    let livesStreamsInPool = [];

    for (const account of accountPool) {
        console.log(`Listing events in account:  ${account.name}`)
     
        if (regionsToSearch) {
            console.log(`Searching across regions: ${JSON.stringify(regionsToSearch)}`)
            if (!regionsToSearch.includes(account.location)){
               console.log(`account:${account.name} in region : ${account.location} is not in the continent regions list.`);
               continue;
            }
        }

        for await (const liveEvent of mediaServicesClient.liveEvents.list(
            resourceGroup,
            account.name,
            {

                abortSignal: AbortController.timeout(10000), // 10 seconds - throws a 500
            }
        )) {
            console.log(`Found event:  ${liveEvent.name}`)

            if (liveEvent.resourceState == KnownLiveEventResourceState.Stopped) {
                livesStreamsInPool.push({
                    location: liveEvent.location,
                    name: liveEvent.name,
                    createdAt: liveEvent.created,
                    protocol: liveEvent.input.streamingProtocol,
                    streamKey: liveEvent.input.accessToken,
                })
            }
        }
    }

    return livesStreamsInPool;
}


export default httpTrigger;