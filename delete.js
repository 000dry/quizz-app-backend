import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
//same set up as 'get' but more kill-y
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      quizId: event.pathParameters.id
    }
  };

  await dynamoDb.delete(params);

  return { status: true };
});