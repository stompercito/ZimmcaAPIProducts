const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});



exports.handler = (event, context, callback) => {
const id = event.type;
if(id === 'all'){
const params = { TableName: "ZimmcaProducts" }
dynamoDB.scan(params, function(err, data) {
if (err){
console.log(err, err.stack); // an error occurred
callback(err);
}
else {
console.log(data); // successful response
const items = data.Items.map(
(dataField) => { return {
    idProducto: +dataField.idProducto.N, 
    idCategoria_fk: +dataField.idCategoria_fk.N, 
    nombre: dataField.nombre, 
    descripcion: dataField.descripcion, 
    precio: +dataField.precio.N, 
    cantidad: +dataField.cantidad.N, 
    imgUrl: dataField.imgUrl } 
} );
callback(null, items);
}
});
} else {
const params = {
Key: {
"idProducto": {
N: id
}
},
TableName: "ZimmcaProducts"
};
dynamoDB.getItem(params, function(err, data) {
if (err) { 
    callback(err); 
} else { 
    callback(null, [ {
        idProducto: +data.Item.idProducto.N, 
        idCategoria_fk: +data.Item.idCategoria_fk.N, 
        nombre: data.Item.nombre.S, 
        descripcion: data.Item.descripcion.S, 
        precio: +data.Item.precio.N, 
        cantidad: +data.Item.cantidad.N,
        imgUrl: data.Item.imgUrl.S } ]) }
});
} 
};