import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import paramLogger from "./libs/param-logger";

export const main = handler(async (event, context) => {
    //KeyConditionExpression will match our paramater :userId given to data in userId field of our db
    //":userId is given its value from the cognitoIdentityId from our user's request"
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  paramLogger("LIST", params);
  const result = await dynamoDb.query(params);
  console.log("RESULT from DB query for LIST action: ", result);

  // return the matching list of items in response body (as array)
  return result.Items;
});