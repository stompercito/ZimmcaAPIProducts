const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});



exports.handler = (event, context, callback) => {
const params = {
Key: {
"idProducto": {
N: event.idProducto
}
},
TableName: "ZimmcaProducts"
};

dynamoDB.deleteItem(params, function(err, data) {
if (err){
callback(err);
} else {
callback(null, data);
}
});
};