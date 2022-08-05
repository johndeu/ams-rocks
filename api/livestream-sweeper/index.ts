import { DefaultAzureCredential } from '@azure/identity';
import { Asset, AzureMediaServices, LiveEvent } from '@azure/arm-mediaservices';
import { AbortController } from '@azure/abort-controller';
import { liveStream } from '../models/liveStream';
import { account } from '../models/account';
import { asset } from '../models/asset';
var moment = require('moment');

// This is the main Media Services client object
let mediaServicesClient: AzureMediaServices;
// Long running operation polling interval in milliseconds
const longRunningOperationUpdateIntervalMs = 1000;

// Copy the samples.env file and rename it to .env first, then populate it's values with the values obtained 
// from your Media Services account's API Access page in the Azure portal.
const subscriptionId: string = process.env.AZURE_SUBSCRIPTION_ID as string;
const resourceGroup: string = process.env.AZURE_RESOURCE_GROUP as string;
const accountPool: account[] = JSON.parse(process.env.ACCOUNT_POOL as string)


// const credential = new ManagedIdentityCredential("<USER_ASSIGNED_MANAGED_IDENTITY_CLIENT_ID>");
const credential = new DefaultAzureCredential({
    managedIdentityClientId: process.env.USER_MANAGED_IDENTITY_CLIENT_ID as string
});

// DURATIONS:
const liveEventTtlMinutes = 5
const assetLiveTtlMinutes = 10

module.exports = async function (context: any, myTimer: any) {
    var timeStamp = new Date().toISOString();

    if (myTimer.isPastDue) {
        context.log('Sweeper is running late!');
    }

    context.log('LiveStream Sweeper timer trigger function ran!', timeStamp);

    try {
        mediaServicesClient = new AzureMediaServices(credential, subscriptionId)
    } catch (err) {
        console.log(`Error retrieving Media Services Client.`);
        console.error(err);
    }

    // Clean up the live events older than liveEventTtlMinutes and still runnning...

    await listLiveStreams().then(liveStreams => {
        if (liveStreams.length > 0) {
            console.log("Looking for Running events");
            liveStreams.forEach(liveStream => {
                if (liveStream.status == "Stopped") {
                    console.log("This live Stream is already stopped", liveStream.name);
                }
                if (liveStream.status == "Running") {
                    console.log("Found a RUNNNING live event", liveStream.name);

                    let startTime = liveStream.tags.startTime;
                    if (startTime) {
                        console.log(`StartTime ${startTime}`)
                        let startedAt = moment(startTime);
                        let now = moment();
                        let duration = now.diff(startedAt, 'minutes')
                        console.log(`duration ${duration}`)

                        if (duration > liveEventTtlMinutes) {
                            stopLiveStream(liveStream)
                        }

                    }
                }
            });
        } else {
            console.log("No live streams found to stop");

            context.res = {
                status: 404,
                body: {
                    "message": "No live streams available at this time",
                    "code": 404
                }
            }
        }
    })

    // Clean up assets in the account pools
    await listAssets().then((assets) => {
        if (assets.length > 0) {
            console.log("Looking for old Assets to clean up");
            assets.forEach((asset) => {
                let startTime = asset.createdAt;
                if (startTime) {
                    console.log(`StartTime ${startTime}`)
                    let startedAt = moment(startTime);
                    let now = moment();
                    let duration = now.diff(startedAt, 'minutes')
                    console.log(`duration ${duration}`)

                    // Delete the asset after assetLiveTtlMinutes 
                    if (duration > assetLiveTtlMinutes) {
                        deleteAsset(asset)
                    }

                }
            })
        }
    });


    async function deleteAsset(asset: asset): Promise<void> {
        if (asset) {
            console.log(`Deleting the asset : ${asset.name}`)
            await mediaServicesClient.assets.delete(resourceGroup, asset.account, asset.name);
        }
    }

    async function stopLiveStream(liveStream: liveStream): Promise<void> {
        if (liveStream) {
            console.log(`Stopping the live stream: ${liveStream.name} `);

            // Attempt to start the long running operation and wait
            await mediaServicesClient.liveEvents.beginStopAndWait(
                resourceGroup,
                liveStream.account,
                liveStream.name,
                {
                    removeOutputsOnStop: true,
                },
                { updateIntervalInMs: longRunningOperationUpdateIntervalMs }
            );

        }

    }

    async function listLiveStreams(): Promise<liveStream[]> {
        console.log("Listing live streams");

        let eventsInPool: any[] = [];

        for (const account of accountPool) {
            let eventsInAccount = await mediaServicesClient.liveEvents.list(
                resourceGroup,
                account.name,
                {
                    abortSignal: AbortController.timeout(60000),
                }
            );

            console.log(`Events in account ${account.name}`)

            for await (const liveEvent of eventsInAccount) {
                let item: LiveEvent = liveEvent;
                console.log(`Found event: ${item.name} in location: ${item.location} in state : ${item.resourceState}`)
                eventsInPool.push({
                    id: item.id,
                    name: item.name,
                    location: item.location,
                    createdAt: item.created,
                    lastModified: item.lastModified,
                    status: item.resourceState,
                    tags: item.tags,
                    account: account.name
                })
            }
        }

        console.log(`Count of events in pool : ${eventsInPool.length}`);
        return eventsInPool;
    }


    async function listAssets(): Promise<asset[]> {
        console.log("Listing assets");

        let assetsInPool: any[] = [];

        for (const account of accountPool) {
            let assetsInAccount = await mediaServicesClient.assets.list(
                resourceGroup,
                account.name,
                {
                    abortSignal: AbortController.timeout(60000),
                }
            );

            console.log(`Listing assets in account ${account.name}`)

            for await (const asset of assetsInAccount) {
                let currentAsset: Asset = asset;
                console.log(`Found asset: ${currentAsset.name}`)
                assetsInPool.push({
                    id: currentAsset.id,
                    name: currentAsset.name,
                    createdAt: currentAsset.created,
                    lastModified: currentAsset.lastModified,
                    account: account.name,
                    location: account.location
                })
            }
        }

        console.log(`Count of asset in pool : ${assetsInPool.length}`);
        return assetsInPool;
    }
}