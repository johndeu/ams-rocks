import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential } from '@azure/identity';
import { AzureMediaServices } from '@azure/arm-mediaservices';
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
    context.log('HTTP trigger - Livestream/stop.');

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
        console.log(`Stopping live event:  ${name}`);

        const account = (await getAccount(liveStream.location)).name;
        console.log (`Account ${account}`);

        // Attempt to start the long running operation and wait
        await mediaServicesClient.liveEvents.beginStopAndWait(
            resourceGroup, 
            account, 
            name, 
            { removeOutputsOnStop: true }, 
            { updateIntervalInMs: longRunningOperationUpdateIntervalMs }
        );

        context.res = {
            status: 200, // accepted
            body: {

            }
        };
    }
};

const getAccount = async function (location: string): Promise<account> {

    if (!location)
        throw Error("Location is undefined");

    let accountMatch;
    let count = 0;
    accountPool.forEach((account) => {
        if (account.location.toLowerCase().includes(location.toLowerCase())){
            accountMatch = account;
            count++;
            console.log(`Matched account location ${location} to account ${account.name} and ${account.location}`)
        }
    })

    if (!accountMatch)
        throw Error("Could not find account in pool that matches location")
    if (count >1) 
        throw Error(`Matched more than one account in location: ${location}. Check the pool configuration file for duplicate regions.`)
    
    return accountMatch;
}

export default httpTrigger;