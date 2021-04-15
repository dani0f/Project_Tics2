const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderSchema = new Schema({
    oc: Number,
    position: Number,
    solped: Number,
    proyecto: Number,
    documentdate: String,
    proveedor: String,
    description: String,
    deliverydate: String,
    promisedate: String,
    forecast: String,
    estado: String,
    comprador: String,
    cantidadsolicitada: Number,
    cantidadentregada: Number,
    cantidadfaltante: Number,
    tipodespacho: String,
    guia: Number,
    comentario: String
    
});

module.exports = mongoose.model('order', orderSchema);

