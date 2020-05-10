export default function handler(lambda) {
    return function (event, context) {
      console.log("HANDLER-LIBR hit with EVENT: ", event);
      console.log("HANDLER-LIBR hit with CONTEXT: ", context);
      return Promise.resolve()
        // Run the Lambda
        .then(() => lambda(event, context))
        // On success
        .then((responseBody) => [200, responseBody])
        // On failure
        .catch((e) => {
          console.log("ERROR caught in HANDLER-LIB: ", e.message);
          return [500, { error: e.message }];
        })
        // Return HTTP response
        .then(([statusCode, body]) => ({
          statusCode,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(body),
        }));
    };
  }