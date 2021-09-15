import { AzureFunction, Context, HttpRequest } from "@azure/functions";

// Next.js Image Loader resize function
// For details on the usage of the Jimp image library see - https://www.npmjs.com/package/jimp
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Next.js Image Loader resize function triggered');

    var src = (req.query.src || (req.body && req.body.src));
    var width : number = ( Number.parseInt(req.query.width) || 100);
    var quality: number = (Number.parseInt(req.query.quality) || 75);

    context.log('loading src: ' + src);
    context.log("resizing image to width : " + width);

    var host = context.req.headers.host
    context.log("Host=" + host);
    
    if (src.indexOf('/img') >= 0){
        src = 'http://' + host + src;
    }

    var Jimp = require ('jimp');
   
    await Jimp.read(src)
        .then(image => {
            //Resize
            image.resize(width, Jimp.AUTO, Jimp.RESIZE_BICUBIC);
            image.quality(quality);
            image.getBufferAsync(Jimp.MIME_JPEG).then(buffer => {
                    context.res.setHeader("Content-Type", "image/jpeg");
                    context.res.body = new Uint8Array(buffer);
                }
            )
        })
        .catch(err => {
            //handle error
            context.log (err);
            context.res = {
                status: 400,
                body: "Please pass in valid src, width and quality query options"
            }
        });

};

export default httpTrigger;