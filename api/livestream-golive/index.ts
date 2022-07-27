import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential } from '@azure/identity';
import { AzureMediaServices, LiveEvent } from '@azure/arm-mediaservices';
import { AbortController } from '@azure/abort-controller';
import { liveStream } from '../models/liveStream';
import { account } from '../models/account'

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

        const account = (await getAccount(liveStream.location)).name;

        // Attempt to start the long running operation and wait
        await mediaServicesClient.liveEvents.beginStartAndWait(
            resourceGroup,
            account,
            name,
            {
                updateIntervalInMs: longRunningOperationUpdateIntervalMs,
                abortSignal: AbortController.timeout(60000), // timeout after 1 minute and fire 500 for now.
            }).then(() => {
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

export default httpTrigger;