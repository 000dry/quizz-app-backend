import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

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

  const result = await dynamoDb.query(params);

  // return the matching list of items in response body (as array)
  return result.Items;
});