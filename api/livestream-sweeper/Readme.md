# Azure Function TimerTrigger

This function is using a TimerTrigger to clean up and stop all live events that have been running for longer than 5 minutes. 

## Deployment
Unfortunately, Azure Static Web Apps does not allow you to host a timer trigger... which sucks. 
"Error in processing api build artifacts: the file 'livestream-sweeper/function.json' has specified an invalid trigger of type 'timerTrigger' and direction 'in'. Currently, only httpTriggers are supported. Visit https://github.com/Azure/azure-functions-host/wiki/function.json for more information."

Options are:
1. Call this API manually - but that doesn't help much...
1. Move this to it's own function app standalone.


## Requirements

To debug and run this function locally, you must enable the local storage Emulator by installing the Azurite extension in VS Code. 
https://marketplace.visualstudio.com/items?itemName=Azurite.azurite

## Trigger definition

This function uses a TimerTrigger binding that is set to use a CRON style schedule that will trigger the function to run every 5 minutes.

```nodejs
"bindings": [
    {
      "type": "timerTrigger",
      "direction": "in",
      "name": "myTimer",
      "schedule": "0 */5 * * * *",
      "runOnStartup": false
    }
  ]
```

## Manual execution

You can manually trigger this function using a POST to the admin path with an empty body

```http
POST http://localhost:7071/admin/functions/livestream-sweeper   HTTP/1.1
content-type: application/json

{
}
```

## Errors

If you receive an error message such as the following, it is likely because of one of the following:

1. You do not have the storage emulator installed and running locally
1. You do not have the local.setting.json configured to use - "AzureWebJobsStorage": "UseDevelopmentStorage=true;"

```bash 
No connection could be made because the target machine actively refused it. (127.0.0.1:10000)
```
