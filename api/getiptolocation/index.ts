import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import fetch from 'node-fetch'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Get IP to Location function triggered');
    const ip = (req.query.ip || (req.body && req.body.ip));

    fetch("https://atlas.microsoft.com/geolocation/ip/json?api-version=1.0&ip={ip}", {
        method: "Get",
    }).then((response) => {
        console.log(response);
        JSON.stringify(response.body)
    }).then( (data) => {
        console.log(data);
    }).catch((err) => {
        console.error(err);
    })

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            countryRegion: "US"
        }
    };

};

export default httpTrigger;