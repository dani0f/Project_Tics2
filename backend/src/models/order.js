const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderSchema = new Schema({
    dispatchGuide: String,
    orderRequest: String,
    supplier: String,
    description: String,
    deliveredQuantity: Number,
    quantityToBeDelivered: Number,
    project: String,
    status: String,
    documentData: String,
    deliveryDate: Date,
    delayHistory: [Date]
});

module.exports = mongoose.model('order', orderSchema);

