import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import paramLogger from "./libs/param-logger";

export const main = handler(async (event, context) => {
//get via cognito identity ID and quizId in route path
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      quizId: event.pathParameters.id
    }
  };

  paramLogger("GET", params);

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    try {
      throw new Error("Item not found.");
    } catch (e) {
      console.log("GET result from DB query: ", e.message);
    }
  }

  // return the retrieved item
  return result.Item;
});