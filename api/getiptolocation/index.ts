import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Get IP to Location function triggered');
    const ip = (req.query.ip || (req.body && req.body.ip));
    const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY as string;

    await axios
        .get(`https://atlas.microsoft.com/geolocation/ip/json?api-version=1.0&ip=${ip}&subscription-key=${subscriptionKey}`)
        .then(res => {
            console.log("Status:" + res.status);

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {
                    countryRegion: res.data.countryRegion.isoCode
                }
            };

        })
        .catch((err) => {
            console.error("Error calling Map API geolocation: " + err.message);
            context.res= {
                status:500,
            }
            return;
        })

};

export default httpTrigger;