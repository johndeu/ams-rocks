import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential } from '@azure/identity';
import { AzureMediaServices, LiveEvent } from '@azure/arm-mediaservices';
import { AbortController } from '@azure/abort-controller';
import {liveStream} from '../models/liveStream';
import {account} from '../models/account'

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


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger - Livestream create');
    console.log("Getting the client for Media Services");


    try {
        mediaServicesClient = new AzureMediaServices(credential, subscriptionId)
    } catch (err) {
        console.log(`Error retrieving Media Services Client.`);
        console.error(err);
    }

    if (req.method == "GET") {
        console.log("Getting live events from AMS accounts");

        await listLiveStreams().then(liveStreams => {
            if (liveStreams.length > 0) {
                context.res = {
                    status: 200, /* Defaults to 200 */
                    body: liveStreams
                };
            } else {
                context.res = {
                    status: 404,
                    body: {
                        "message": "No live streams available at this time",
                        "code": 404
                    }
                }
            }
        });


    }

};

async function createLiveStream() {

    console.log("Creating live stream");

}

async function listLiveStreams(): Promise<liveStream[]> {
    console.log("Listing live streams");

    let eventsInPool = [];

    for (const account of accountPool) {
        console.log(`Listing events in account:  ${account.name}`)
        let eventsInAccount = await mediaServicesClient.liveEvents.list(
            resourceGroup, 
            account.name,
            {
                abortSignal: AbortController.timeout(15000),
            }
            );
        
        await eventsInAccount.next().then(liveEvent => {
            let item: LiveEvent = liveEvent.value

            console.log(`Found event:  ${item.name}`)

            eventsInPool.push({
                name: item.name,
                location: item.location,
                createdAt: item.created,
                status: item.resourceState,
                protocol: item.input.streamingProtocol,
                streamKey: item.input.accessToken,
                latencyMode: item.streamOptions.includes("LowLatencyV2") ? "LowLatencyV2" : "",
                ingestUrl: item.input.endpoints[2].url, //HTTPS primary
               
            })
        })
    }

    console.log(`Events in pool: ${eventsInPool}`);

    return eventsInPool;
}


export default httpTrigger;