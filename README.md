# GET STARTED

In root of project:

```npm i```

# SERVERLESS YAML

Read this file as a manifest of our lambda functions, how they are set up, their permissions and their DB interactions

# TEST CRUD LOCALLY:

- always run create first:
    ```serverless invoke local --function get --path mocks/get-event.json```

- take note of "quizId" value in response - you will need this to test further specific reads/edits
- go to ```./mocks``` and update ```pathParameters.id``` in get-event.json, update-event.json and delete-event.json to the ID you got back from running create
- run other functions, where {event} is replaced with one of either create, get, update, list, delete:

    ```serverless invoke local --function {event} --path mocks/get-event.json```


# DEBUG

```handler.js``` is where our requests come and go - console.log() out from there as all error responses are currently being smushed into 500s