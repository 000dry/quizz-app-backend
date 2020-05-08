import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      quizId: event.pathParameters.id
    },
    //we're updating our content
    UpdateExpression: "SET content = :content",
    //not sure about null value here - blurring between update and delete
    ExpressionAttributeValues: {
      ":content": data.content || null
    },
    //ReturnValues specifies what you want to have returned from this request - in our instance, ALL_NEW responds with everything that has changed after the update
    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.update(params);

  return { status: true };
});