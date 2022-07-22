## Wocket Server for RTMP ingest

This sample is based off the Wocket project from MuxLabs. 

See the [MuxLabs/wocket](https://github.com/MuxLabs/wocket) readme file for background on the project.
This [blog post on the state of going live from the browser](https://www.mux.com/blog/the-state-of-going-live-from-a-browser) has the best explanation of how this code is working. 

### Overview
This project uses video of Web Sockets to send the camera feed from the browser up to Azure Media Services over RTMP. It utilizes a container that runs a lightweight Node.js server that both serves up dynamic Next.js pages, as well as receives the web socket connection.  The server also runs an instance of ffmpeg to receive data from the MediaRecorder API in the browser, and proxy it forward to AMS over RTMP. 

In the browser, the /demo.js page in the Next.js project uses getUserMedia() to enumerate and access the local camera and microphones. It then renders the video into a canvas, and uses the MediaRecorder API to send video chunks over a WebSocket. Using the canvas element, we can manipulate the video and overlay it with any content that we like.  In this example, we are rendering a clock.  The MediaRecorder will fire an event every time it has a "chunk" of video data ready, at which point you send it to the server via the websocket as a binary blob. The server then listens for these data chunks and pipes them into a running ffmpeg command as they're received.

The benefit to this approach is that it's much closer to "traditional" applications in terms of running and scaling. You need a persistent WebSocket connection with each streamer, yes, but the requirements of each stream are actually pretty low since we've got ffmpeg doing as little as possible before publishing the RTMP stream. We could do more complicated things in the FFMPEG instance if we desired, like burning in a watermark image that the user has no control over, as well as timing out the FFMPEG running instance using the "-t" flag to limit the length of streaming for our demo application (although a simple timer that disconnects the WebSocket is much better solution). 

This server should be deployed to Azure Container Apps so that it can scale based on a CPU or HTTP request scale trigger, and so that it can used with the /demo page in this next.js project.

### How to develop

1. Launch the /wocket folder standalone in VS Code in order to allow the Dockerfiler build image and "Build image in Azure" functions to work properly. Otherwise, the paths are slightly different when building to Azure, and you have to include "/wocket/" in the front of the path for all of the Dockerfile COPY operations. 
1. Use local Docker Desktop to build the image and run it locally. Be sure to Expose port 8080 when launching an instance of the image. 
1. You will know the Docker image is running if you hit https://localhost:8080 and see the next.js index.js page. 
1. Set the .env.local file Environment variables to use the local Docker container.
1. Once you are ready, deploy the image to Azure Container Apps to run it in the cloud.

### How to deploy:

#### Use the Azure CLI
[Quickstart: Deploy an existing container image with the Azure CLI](https://docs.microsoft.com/en-us/azure/container-apps/get-started-existing-container-image?tabs=bash&pivots=container-apps-private-registry)

#### Use the Azure Portal
[Quickstart: Deploy an existing container image in the Azure Portal](https://docs.microsoft.com/en-us/azure/container-apps/get-started-existing-container-image-portal?pivots=container-apps-private-registry)

#### Use VS Code
[Tutorial: Deploy to Azure Container Apps using Visual Studio Code](https://docs.microsoft.com/en-us/azure/container-apps/deploy-visual-studio-code)


The following Visual Studio Code extensions installed:
- The Azure Account extension
- The Azure Container Apps extension

Once you are signed into Azure you can use the extension to deploy this container image to Azure Container Apps
1. Open the /Wocket folder in VSCode in a standalone instance - so that the paths in the DockerFile work for both local and Azure builds.
1. First, right click on the DockerFile in the explorer and select **Build Image in Azure**. 
1. When prompted, accept the default name for the image tag. Select Enter to confirm and continue.
1. Select the subscription to use
1. Select a container registry or create a new one
1. Select a region nearest to you.
1. Create a Container App environment in the Container Apps extension in VS Code by simply right clicking on the subscription and selecting Create Environment.  There may already be one for your container after building.
1. Right click on the Container App Environment name and select Create Container App.
1. Enter a name for the new container app, such as wocketcontainerapp
1. Select Azure Container Registries when prompted.
1. Select the container registry you created above
1. [TODO]