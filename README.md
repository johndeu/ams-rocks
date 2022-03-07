# Azure Media Services demo and samples site

This project is using the following technologies:
* Next.js
* React
* Typescript
* Azure Static Web Sites
* Azure Functions
* Azure Media Services
* Shaka player

## Starting the local application and API

1. In order to debug both client and API at the same time, open two separate instances of VS Code. This is because we need to run the web site on port 3000, and the functions app on port 7071.  We will have a proxy to the API going through port 4280.

1. In one instance of VS Code, open the root folder.

    Run this command to launch the Next.js Website

    ``` bash
    npm start-next
    ```

1. You should see next start up with a "ready" started server on http://localhost:3000

1. In a second VS Code instance, open from the /api folder

    Run the following command to launch the API functions application. This is an Azure Functions project. 

    ``` bash
    npm start
    ```

1. You should see Azure Functions app start up successfully and list the available functions in the console. Look for hello: [GET,POST] http://localhost:7071/api/hello for example.  You can click this and see a response JSON message to make sure it is working.
1. You should now be able to navigate to http://localhost:3000, and the Functions app should be available on http://localhost:7071/api.  You can test it by hitting the "hello" function on http://localhost:7071/api/hello
1. Finally, we will start up the Azure Static Web site emulator, which will create a proxy to the web site and API on port 4280.
   In one of the VS Code instances (it doesn't matter which instance), open a second integrated terminal, change to the root directory and start the proxy:

    ``` bash
    npm run start-swa
    ```

The Static Web Site emulator will launch and the Next.js application is now available on both port 3000 and on port 4280 (with a proxy to the API).
Now use port 4280 when you want to use the simulated Azure Static Web app hosted environment.  This allows you to see both the API and the Next.js application on the same port similar to how it will be deployed to Azure Static Web Apps publicly.
You can now debug and test your app and functions locally.

## How to use Azure Static Web Apps

For detailed instructions and a complete How-to on building an Azure Static Web App with an API, see the article [Build a new Static Web App on Azure with Node.js](https://docs.microsoft.com/en-us/azure/developer/javascript/how-to/create-static-web-app)

## Using Azure Functions as the API

This web site uses Azure Functions hosted in the Azure Static web apps environment to provide an API. 
For details on using Azure Functions as an API see the article:

[Adding and API to Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/add-api?tabs=vanilla-javascript)

### Getting data from the API in a React component

In order to get data from an Azure Functions API in a React Component in this project, follow the details here:

[Connecting the client to API](https://docs.microsoft.com/en-us/azure/developer/javascript/how-to/with-web-app/static-web-app-with-swa-cli/connect-client-to-api)


## Usage of the  [NextJS Material Kit](https://demos.creative-tim.com/nextjs-material-kit?ref=njsmk-readme) in this site

This web site is using a fork of ![version](https://img.shields.io/badge/version-1.2.0-blue.svg)  of the NextJS Material UI Kit.

![license](https://img.shields.io/badge/license-MIT-blue.svg) [![GitHub issues open](https://img.shields.io/github/issues/creativetimofficial/nextjs-material-kit.svg?maxAge=2592000)](https://github.com/creativetimofficial/nextjs-material-kit/issues?q=is%3Aopen+is%3Aissue) [![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/creativetimofficial/nextjs-material-kit.svg?maxAge=2592000)](https://github.com/creativetimofficial/nextjs-material-kit/issues?q=is%3Aissue+is%3Aclosed)


**[NextJS Material Kit](https://demos.creative-tim.com/nextjs-material-kit/?ref=njsmk-readme)** is a Free Material-UI Kit with a fresh, new design inspired by Google's material design and is was developed using [NextJS](https://nextjs.org/?ref=creativetim), starting from [this starter project](https://github.com/mui-org/material-ui/tree/master/examples/nextjs) by [Material-UI](https://material-ui.com/?ref=creativetim) and [Material Kit React](https://www.creative-tim.com/product/material-kit-react?ref=njsmk-readme) by Creative Tim. You asked for it, so we built it. It's a great pleasure to introduce to you the material concepts in an easy to use and beautiful set of components. Along with the restyling of the Material-UI elements, you will find three fully-coded example pages, to help you design your NextJS project.

**[NextJS Material Kit](https://demos.creative-tim.com/nextjs-material-kit/?ref=njsmk-readme)** makes use of light, surface and movement. It uses a deliberate color choice, edge-to-edge imagery and large scale typography. The general layout resembles sheets of paper following multiple different layers, so that the depth and order is obvious. The navigation stays mainly on the left and the actions on the right.

**[NextJS Material Kit](https://demos.creative-tim.com/nextjs-material-kit/?ref=njsmk-readme)** was built with the help of [nextjs](https://nextjs.org/?ref=creativetim) and it uses a framework built by our friends from **[Material-UI](https://material-ui.com/?ref=creativetim)**, who did an amazing job creating the backbone for the material effects, animations, ripples and transitions. Big thanks to this team for the effort and forward thinking they put into it.

## Quick start if you would like to use the same NextJS Material Kit in your projects

- [Download from Github](https://github.com/creativetimofficial/nextjs-material-kit/archive/main.zip).
- [Download from Creative Tim](https://www.creative-tim.com/product/nextjs-material-kit?ref=njsmk-readme).
- Clone the repo: `git clone https://github.com/creativetimofficial/nextjs-material-kit.git`.
- `npm i nextjs-material-kit`
- Install with [Bower](https://bower.io/?ref=creativetim): ```bower install nextjs-material-kit```.


## NextJS Material Kit Documentation
The documentation for the NextJS Material Kit is hosted at our [website](https://demos.creative-tim.com/nextjs-material-kit/documentation/tutorial?ref=njsmk-readme).


## File Structure of the NextJS Material base site
Within the site you'll find the following directories and files:

```
nextjs-web-site
.
├── CHANGELOG.md
├── ISSUE_TEMPLATE.md
├── LICENSE.md
├── README.md
├── next.config.js
├── package.json
├── Documentation
│   ├── assets
│   └── tutorial-components.html
├── assets
│   ├── css
│   ├── img
│   │   ├── examples
│   │   └── faces
│   ├── jss
│   │   ├── nextjs-material-kit
│   │   │   ├── components
│   │   │   └── pages
│   │   │       ├── componentsSections
│   │   │       └── landingPageSections
│   │   └── nextjs-material-kit.js
│   └── scss
│       ├── core
│       │   ├── mixins
│       │   └── variables
│       ├── plugins
│       └── nextjs-material-kit.scss
├── pages
│   ├── _app.js
│   ├── _document.js
│   ├── _error.js
│   ├── components.js
│   ├── index.js
│   ├── landingpage.js
│   ├── loginpage.js
│   └── profilepage.js
├── components
│   ├── Badge
│   │   └── Badge.js
│   ├── Card
│   │   ├── Card.js
│   │   ├── CardBody.js
│   │   ├── CardFooter.js
│   │   └── CardHeader.js
│   ├── Clearfix
│   │   └── Clearfix.js
│   ├── CustomButtons
│   │   └── Button.js
│   ├── CustomDropdown
│   │   └── CustomDropdown.js
│   ├── CustomInput
│   │   └── CustomInput.js
│   ├── CustomLinearProgress
│   │   └── CustomLinearProgress.js
│   ├── CustomTabs
│   │   └── CustomTabs.js
│   ├── Footer
│   │   └── Footer.js
│   ├── Grid
│   │   ├── GridContainer.js
│   │   └── GridItem.js
│   ├── Header
│   │   ├── Header.js
│   │   └── HeaderLinks.js
│   ├── InfoArea
│   │   └── InfoArea.js
│   ├── NavPills
│   │   └── NavPills.js
│   ├── PageChange
│   │   └── PageChange.js
│   ├── Pagination
│   │   └── Pagination.js
│   ├── Parallax
│   │   └── Parallax.js
│   ├── Snackbar
│   │   └── SnackbarContent.js
│   └── Typography
│       ├── Danger.js
│       ├── Info.js
│       ├── Muted.js
│       ├── Primary.js
│       ├── Quote.js
│       ├── Small.js
│       ├── Success.js
│       └── Warning.js
└── pages-sections
    ├── Components-Sections
    │   ├── SectionBasics.js
    │   ├── SectionCarousel.js
    │   ├── SectionCompletedExamples.js
    │   ├── SectionDownload.js
    │   ├── SectionExamples.js
    │   ├── SectionJavascript.js
    │   ├── SectionLogin.js
    │   ├── SectionNavbars.js
    │   ├── SectionNotifications.js
    │   ├── SectionPills.js
    │   ├── SectionTabs.js
    │   └── SectionTypography.js
    └── LandingPage-Sections
        ├── ProductSection.js
        ├── TeamSection.js
        └── WorkSection.js
```


## Licensing

- NextJS Material is Copyright 2021 Creative Tim (https://www.creative-tim.com/?ref=njsmk-readme)
- Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-kit/blob/main/LICENSE.md)

