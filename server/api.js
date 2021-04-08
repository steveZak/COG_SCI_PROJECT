var AWS = require('aws-sdk');
AWS.config.loadFromPath('./server/config.json');
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var addResponse = (sessionID, groupID, q1, q1Timestamp, q2, q2Timestamp) => {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: 'cognitive_science_data',
      Item: {
        'session_id' : { S : sessionID },
        'group_id' : { S : groupID },
        'q1' : { N : q1 },
        'q1Timestamp' : {N : q1Timestamp },
        'q2' : { N : q2 },
        'q2Timestamp' : {N : q2Timestamp },
      }
    };
    
    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
        resolve();
      }
    });
  });
}


module.exports = {
  addResponse: addResponse,
};