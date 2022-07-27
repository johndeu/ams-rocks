import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential } from '@azure/identity';
import { AzureMediaServices, KnownLiveEventResourceState, LiveEvent } from '@azure/arm-mediaservices';
import { AbortController } from '@azure/abort-controller';

// This is the main Media Services client object
let mediaServicesClient: AzureMediaServices;
// Long running operation polling interval in milliseconds
const longRunningOperationUpdateIntervalMs = 1000;

// Copy the samples.env file and rename it to .env first, then populate it's values with the values obtained 
// from your Media Services account's API Access page in the Azure portal.
const subscriptionId: string = process.env.AZURE_SUBSCRIPTION_ID as string;
const resourceGroup: string = process.env.AZURE_RESOURCE_GROUP as string;
const accountPool: account[] = JSON.parse(process.env.ACCOUNT_POOL);

// const credential = new ManagedIdentityCredential("<USER_ASSIGNED_MANAGED_IDENTITY_CLIENT_ID>");
const credential = new DefaultAzureCredential({
    managedIdentityClientId: process.env.USER_MANAGED_IDENTITY_CLIENT_ID as string
});

// Object to return
interface liveStream {
    name: string,
    status: string,
    createdAt: Date,
    protocol: string,
    streamKey: string,
    latencyMode: string,
    ingestUrl: string,
    location: string,
}

interface account {
    name: string,
    location: string,
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    console.log('HTTP trigger - Livestream getAvailable');
    console.log("Getting the client for Media Services");

    try {
        mediaServicesClient = new AzureMediaServices(credential, subscriptionId)
    } catch (err) {
        console.log(`Error retrieving Media Services Client.`);
        console.error(err);
    }

    if (req.method == "GET") {
        console.log("Getting available live events from AMS accounts");

        await listAvailableStreams().then(liveStreams => {
            if (liveStreams.length > 0) {
                context.res = {
                    status: 200, /* Defaults to 200 */
                    body: liveStreams
                };
            } else {
                context.res = {
                    status: 404,
                    body: {
                        "message": "No live streams available at this time. Try again later.",
                        "code": 404
                    }
                }
            }
        });


    }

};

async function listAvailableStreams(): Promise<liveStream[]> {
    console.log("Listing available live streams");

    let livesStreamsInPool = [];

    for (const account of accountPool) {
        console.log(`Listing events in account:  ${account.name}`)

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
                    ingestUrl: liveEvent.input.endpoints[2].url, //HTTPS primary
                })
            }
        }
    }

    return livesStreamsInPool;
}


export default httpTrigger;