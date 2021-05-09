const aws = require('aws-sdk'); 
const dynamoDB = new aws.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    const params = { 
        Item:{
        "idProducto": {
            N:  event.idProducto
        }, 
        "idCategoria_fk":{
            N: event.idCategoria_fk
        },
        "nombre": { 
            S: event.nombre
        }, 
        "descripcion": {
            S: event.descripcion
        },
        "precio": {
            N: event.precio
        },
        "cantidad": {
            N: event.cantidad
        },
        "imgUrl": {
            S: event.imgUrl
        }
    },
    TableName: "ZimmcaProducts" 
    }
    
    dynamoDB.putItem(params, function(err, data) { 
        if (err){
            console.log(err, err.stack); // an error occurred
            callback(err);
        }else { 
            console.log("OK"); 
            console.log(data); 
            callback(null, data);
        } 
    });
};
