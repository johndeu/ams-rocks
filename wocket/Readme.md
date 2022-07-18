## Wocket Server for RTMP ingest

This sample is based off the Wocket project from MuxLabs. 

See the [MuxLabs/wocket](https://github.com/MuxLabs/wocket) readme file for background on the project.

This server should be deployed to Azure Container Apps to be used with the /demo page in this next.js project. 

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
1. 