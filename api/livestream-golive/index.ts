import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential } from '@azure/identity';
import { AzureMediaServices, LiveEvent } from '@azure/arm-mediaservices';
import { AbortController } from '@azure/abort-controller';
import { liveStream } from '../models/liveStream';
import { account } from '../models/account'
var moment = require('moment');


// This is the main Media Services client object
let mediaServicesClient: AzureMediaServices;
const streamingEndpointName = "default";
let account = null;

// Long running operation polling interval in milliseconds
const longRunningOperationUpdateIntervalMs = 1000;

// Copy the samples.env file and rename it to .env first, then populate it's values with the values obtained 
// from your Media Services account's API Access page in the Azure portal.
const clientId: string = process.env.AZURE_CLIENT_ID as string;
const secret: string = process.env.AZURE_CLIENT_SECRET as string;
const subscriptionId: string = process.env.AZURE_SUBSCRIPTION_ID as string;
const resourceGroup: string = process.env.AZURE_RESOURCE_GROUP as string;
const accountPool: account[] = JSON.parse(process.env.ACCOUNT_POOL);

// const credential = new ManagedIdentityCredential("<USER_ASSIGNED_MANAGED_IDENTITY_CLIENT_ID>");
const credential = new DefaultAzureCredential({
    managedIdentityClientId: process.env.USER_MANAGED_IDENTITY_CLIENT_ID as string
});


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    console.log('HTTP trigger - Livestream Go Live!');
    console.log("Getting the client for Media Services");

    try {
        mediaServicesClient = new AzureMediaServices(credential, subscriptionId)
    } catch (err) {
        console.log(`Error retrieving Media Services Client.`);
        console.error(err);
    }

    if (req.method == "PUT") {
        console.log(`Request name is ${req.body.name}`);
        console.log(`Request location is ${req.body.location}`);
        const liveStream: liveStream = req.body;
        console.log(`liveStream ${liveStream}`);

        const name = liveStream.name;
        console.log(`Starting live event:  ${name}`);

        account = (await getAccount(liveStream.location)).name;

        let started: Date = null;

        let liveEvent = await mediaServicesClient.liveEvents.get(resourceGroup, account, name);


        // Attempt to start the long running operation and wait
        await mediaServicesClient.liveEvents.beginStartAndWait(
            resourceGroup,
            account,
            name,
            {
                updateIntervalInMs: longRunningOperationUpdateIntervalMs,
                abortSignal: AbortController.timeout(60000), // timeout after 1 minute and fire 500 for now.
            }).then(() => {
                started = new Date(Date.now());
                context.res = {
                    status: 200, // accepted
                }
            }).catch(err => {
                console.error(`Error starting live event : ${name}`)
                console.error(err);
                context.res = {
                    status: 500,
                    message: err
                }
            });


        liveEvent.tags = {
            "startTime": moment().format()
        }

        await mediaServicesClient.liveEvents.beginUpdateAndWait(
            resourceGroup,
            account,
            name,
            liveEvent,
            { updateIntervalInMs: longRunningOperationUpdateIntervalMs }
        )
        
        const dateString = new Date(Date.now()).toISOString().replace(/:|\./g, '-');
        const assetName = name + "-" + dateString
        let asset = await mediaServicesClient.assets.createOrUpdate(resourceGroup, account, assetName, {});

        const liveOutputName = name + "-" + dateString;
        const manifestName = "demomanifest";

        // Create a new live Output and get the URL for the manifest
        await mediaServicesClient.liveOutputs.beginCreateAndWait(
            resourceGroup,
            account,
            name,
            liveOutputName,
            {
                archiveWindowLength: "PT6M",
                manifestName:manifestName,
                assetName: assetName
            },
            {
                updateIntervalInMs: longRunningOperationUpdateIntervalMs
            }
        ).then(() => {
            context.res = {
                status: 200, // accepted
            }
        }).catch(err => {
            console.error(`Error starting live output : ${liveOutputName}`)
            console.error(err);
            context.res = {
                status: 500,
                message: err
            }
        });

        // Create a new Streaming Locator
        let locator = await mediaServicesClient.streamingLocators.create(
            resourceGroup,
            account,
            liveOutputName,
            {
                assetName: liveOutputName,
                streamingPolicyName: "Predefined_ClearStreamingOnly" // clear unencrypted asset
            }
        )


        let streamingUrls = await buildManifestPaths(locator.streamingLocatorId, manifestName, null);

        // Return some details on the live stream
        let responseBody = {
            startTime: started,
            liveOutputName: liveOutputName,
            locatorUrl: streamingUrls,
        }

        context.res = {
            body: responseBody
        }
    };
};

const getAccount = async function (location: string): Promise<account> {

    if (!location)
        throw Error("Location is undefined");

    let accountMatch;
    accountPool.forEach((account) => {
        if (account.location == location)
            accountMatch = account;
    })

    if (!accountMatch)
        throw Error("Could not find account in pool that matches location")

    return accountMatch;
}

const buildManifestPaths = async function buildManifestPaths(
    streamingLocatorId: string | undefined,
    manifestName: string,
    filterName: string | undefined) {

    const hlsFormat: string = "format=m3u8-cmaf";
    const dashFormat: string = "format=mpd-time-cmaf";

    // Get the default streaming endpoint on the account
    let streamingEndpoint = await mediaServicesClient.streamingEndpoints.get(resourceGroup, account, streamingEndpointName);

    if (streamingEndpoint?.resourceState !== "Running") {
        console.log(`Streaming endpoint is stopped. Starting the endpoint named ${streamingEndpointName}`);
        await mediaServicesClient.streamingEndpoints.beginStartAndWait(resourceGroup, account, streamingEndpointName, {

        })
            .then(() => {
                console.log("Streaming Endpoint Started.");
            })

    }

    let manifestBase = `https://${streamingEndpoint.hostName}/${streamingLocatorId}/${manifestName}.ism/manifest`

    let hlsManifest: string;

    if (!filterName) {
        hlsManifest = `${manifestBase}(${hlsFormat})`;
    } else {
        hlsManifest = `${manifestBase}(${hlsFormat},filter=${filterName})`;
    }

    let dashManifest: string;
    if (!filterName) {
        dashManifest = `${manifestBase}(${dashFormat})`;
    } else {
        dashManifest = `${manifestBase}(${dashFormat},filter=${filterName})`;
    }

    return {
        hls: hlsManifest,
        dash: dashManifest,
    }
}

export default httpTrigger;