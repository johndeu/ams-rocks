import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";
const fs = require('fs')


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Get IP to Location function triggered');
    const ip = (req.query.ip || (req.body && req.body.ip));
    const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY as string;

    var countryCodes;

    try {
        var contents = fs.readFileSync('./getiptolocation/countryCodes.json')
        countryCodes = JSON.parse(contents)
        //console.log (countryCodes);
    }catch (err) {
        console.log(`Failed to load JSON ${err}`)
    }
        
    await axios
        .get(`https://atlas.microsoft.com/geolocation/ip/json?api-version=1.0&ip=${ip}&subscription-key=${subscriptionKey}`)
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
                // status: 200, /* Defaults to 200 */
                body: {
                    countryRegion: isoCode,
                    continent: currentCountry.continent,
                    countryName: currentCountry.countryName
                }
            };


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