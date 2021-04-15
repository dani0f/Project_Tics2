const express = require('express');
const order = require('../models/order');
const router = express.Router();
const orderSchema = require('../models/order')


router.post('/import',async (req,res) =>{
    console.log("saludos desde routerpostimport")
    console.log("primer dato de ejemplo",req.body.results[0])
    console.log("tamaño",req.body.results.length)
    var orderDefault = {
        oc: req.body.results[0]['Documento compras'],
        position: req.body.results[0]['Posición'],
        solped: req.body.results[0]['Solicitud de pedido'],
        proyecto: 123,
        documentdate: req.body.results[0]['Organización compras'],
        proveedor: "provedor",
        description: "desc",
        deliverydate: "2020-10-10",
        promisedate: "2021-32-21",
        forecast: "fore",
        estado: "String",
        comprador: "String",
        cantidadsolicitada: 21,
        cantidadentregada: 21,
        cantidadfaltante: req.body.results[0]['Por entregar (cantidad)'],
        tipodespacho: "nueva",
        guia: 12,
        comentario: "asdas"
    }
    console.log(orderDefault)
    const order = new orderSchema(orderDefault);
    await order.save()
    res.json({
        status:'Orders Saved'
    });
});

router.get('/', async (req,res) => {
   const orders = await orderSchema.find();
   res.json(orders);
});
router.post('/',async (req,res) =>{
    const order = new orderSchema(req.body);
    await order.save()
    res.json({
        status:'Order Saved'
    });
});
router.put('/:id', async (req,res) =>{
    await orderSchema.findByIdAndUpdate(req.params.id , req.body);
    res.json({
        status: 'Order Update'
    })

});
router.delete('/:id',async (req, res) =>{
    await orderSchema.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Order Removed'
    })
});



module.exports = router;