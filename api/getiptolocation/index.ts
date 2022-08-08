import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";
const fs = require('fs')


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Get IP to Location function triggered');
    const ipAddress = (req.headers['x-forwarded-for'] || '').split(',').pop().trim();
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    console.log(`IPAddress: ${ipAddress}`);
    const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY as string;

    if (!subscriptionKey) {
        context.res = {
            body: "Need to configure the MAPS_SUBSCRIPTION_KEY in configuration settings",
            status: 500,
        }
        return;
    }

    var countryCodes;

    try {
        var contents = fs.readFileSync('./getiptolocation/countryCodes.json')
        countryCodes = JSON.parse(contents)
        //console.log (countryCodes);
    }catch (err) {
        console.log(`Failed to load JSON ${err}`)
    }
        
    await axios
        .get(`https://atlas.microsoft.com/geolocation/ip/json?api-version=1.0&ip=${ipAddress}&subscription-key=${subscriptionKey}`)
        .then(res => {
            console.log("Status:" + res.status);
            let isoCode = res.data.countryRegion.isoCode;
            console.log("IsoCode:" + isoCode);

            let currentCountry;
            countryCodes.forEach(country => {
                if (isoCode == country.iso2){
                    console.log(`Found country ${country.countryName}`)
                    console.log(`on continent ${country.continent}`)
                    currentCountry = country;
                }
            });
            context.res = {
                status: 200, /* Defaults to 200 */
                body: {
                    countryRegion: isoCode,
                    continent: currentCountry.continent,
                    countryName: currentCountry.countryName
                }
            };
            return;


        })
        .catch((err) => {
            console.error("Error calling Map API geolocation: " + err.message);
            context.res = {
                status: 500,
            }
            return;
        })

};

export default httpTrigger;