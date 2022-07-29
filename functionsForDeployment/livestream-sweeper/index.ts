import { DefaultAzureCredential } from '@azure/identity';
import { AzureMediaServices, LiveEvent } from '@azure/arm-mediaservices';
import { AbortController } from '@azure/abort-controller';
import { liveStream } from '../../api/models/liveStream';
import { account } from '../../api/models/account'
var moment = require('moment');

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


module.exports = async function (context, myTimer) {
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

    await listLiveStreams().then(liveStreams => {
        if (liveStreams.length > 0) {
            liveStreams.forEach(liveStream => {
                if (liveStream.status == "Running") {
                    console.log("Found a running live event", liveStream.name);

                    let startTime = liveStream.tags.startTime;
                    if (startTime) {
                        console.log(`StartTime ${startTime}`)
                        let startedAt = moment(startTime);
                        let now = moment();
                        let duration = now.diff(startedAt, 'minutes')
                        console.log(`duration ${duration}`)

                        if (duration > 5) {
                            stopLiveStream(liveStream)
                        }

                    }
                }
            });
        } else {
            context.res = {
                status: 404,
                body: {
                    "message": "No live streams available at this time",
                    "code": 404
                }
            }
        }
    })


};


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

    let eventsInPool = [];

    for (const account of accountPool) {
        let eventsInAccount = await mediaServicesClient.liveEvents.list(
            resourceGroup,
            account.name,
            {
                abortSignal: AbortController.timeout(60000),
            }
        );

        await eventsInAccount.next().then(liveEvent => {
            let item: LiveEvent = liveEvent.value

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
        })
    }

    return eventsInPool;
}

