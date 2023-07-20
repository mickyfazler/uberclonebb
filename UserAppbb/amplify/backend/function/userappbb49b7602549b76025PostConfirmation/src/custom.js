const awsbb = require('aws-sdk');
const ddby = new awsbb.DynamoDB();

exports.handler = async (event, context) => {
  if (!event.request.userAttributes.sub) {
    console.log("Error: No user was written to DynamoDB baby")
    context.done(null, event);
    return;
  }

  // Save the user to DynamoDB
  const datebb = new Date();

  const paramsbb = {
    Item: {
      'id': { S: event.request.userAttributes.sub },
      '__typename': { S: 'User' },
      'username': { S: event.userName },
      'email': { S: event.request.userAttributes.email },
      'createdAt': { S: datebb.toISOString() },
      'updatedAt': { S: datebb.toISOString() },
    },
    TableName: process.env.USERTABLE,
  }

  try {
    await ddby.putItem(paramsbb).promise();
    console.log("Success baby");
  } catch (e) {
    console.log("Error baby", e);
  }

  context.done(null, event);
}
