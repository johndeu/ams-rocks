import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";
const fs = require('fs')

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const position = (req.body);
    const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY as string;
    
    if (!subscriptionKey) {
        context.res = {
            body: "Need to configure the MAPS_SUBSCRIPTION_KEY in configuration settings",
            status: 500,
        }
        return;
    }
     
    console.log (`Position: ${position}`)
    const format = "json";
    const lat = position.latitude;
    const lon = position.longitude;
    const query=`${lat},${lon}`;

    console.log (`Query is : ${query}`);

    var countryCodes;

    try {
        var contents = fs.readFileSync('./getiptolocation/countryCodes.json')
        countryCodes = JSON.parse(contents)
        //console.log (countryCodes);
    }catch (err) {
        console.log(`Failed to load JSON ${err}`)
    }

    await axios
        .get(`https://atlas.microsoft.com/search/fuzzy/${format}?api-version=1.0&query=${query}&language=en-us&entity-type=Country&subscription-key=${subscriptionKey}`)
        .then(res => {
            console.log("Status:" + res.status);
            const address = res.data.results[0].address;

            console.log("Location:" + JSON.stringify(address))

            let isoCode = address.countryCode;
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
                    countryISO2: address.countryCode,
                    country: address.country,
                    countryISO3: address.countryCodeISO3,
                    municipality: address.municipality,
                    continent: currentCountry.continent
                }
            };


        })
        .catch((err) => {
            console.error("Error calling Map API geolocation: " + err.message);
            context.res = {
                body: err,
                status: 500,
            }
            return;
        })

};

export default httpTrigger;