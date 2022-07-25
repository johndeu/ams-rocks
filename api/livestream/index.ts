import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential } from '@azure/identity';
import { AzureMediaServices, LiveEvent } from '@azure/arm-mediaservices';

// This is the main Media Services client object
let mediaServicesClient: AzureMediaServices;
// Long running operation polling interval in milliseconds
const longRunningOperationUpdateIntervalMs = 1000;

// Copy the samples.env file and rename it to .env first, then populate it's values with the values obtained 
// from your Media Services account's API Access page in the Azure portal.
const clientId: string = process.env.AZURE_CLIENT_ID as string;
const secret: string = process.env.AZURE_CLIENT_SECRET as string;
const subscriptionId: string = process.env.AZURE_SUBSCRIPTION_ID as string;
const resourceGroup: string = process.env.AZURE_RESOURCE_GROUP as string;
const accountName: string = process.env.AZURE_MEDIA_SERVICES_ACCOUNT_NAME as string;

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
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger - Livestream create');
    console.log("Getting the client for Media Services");
    try {
        mediaServicesClient = new AzureMediaServices(credential, subscriptionId)
    } catch (err) {
        console.log(`Error retrieving Media Services Client.`);
        console.error(err);
    }

    if (req.method == "POST") {
        createLiveStream()

        context.res = {
            status: 201, // created
            body: ""
        };
    }
    else if (req.method == "GET") {
        console.log("Getting live events from AMS account");

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

    const liveEvents = await mediaServicesClient.liveEvents.list(resourceGroup, accountName);

    let liveStreams: liveStream[] = [];

    await liveEvents.next().then(liveEvent => {
        let item: LiveEvent = liveEvent.value

        liveStreams.push({
            name: item.name,
            createdAt: item.created,
            status: item.resourceState,
            protocol: item.input.streamingProtocol,
            streamKey: item.input.accessToken,
            latencyMode: item.streamOptions.includes("LowLatencyV2") ? "LowLatencyV2" : "",
            ingestUrl: item.input.endpoints[2].url //HTTPS primary

        })

    })
    
    return liveStreams;
}


export default httpTrigger;