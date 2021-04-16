const express = require('express');
const order = require('../models/order');
const router = express.Router();
const orderSchema = require('../models/order')


router.post('/import',async (req,res) =>{
    console.log("saludos desde routerpostimport")
    console.log("primer dato de ejemplo",req.body.results[0])
    console.log("tamaño",req.body.results.length)
    var proyecto ="" 
    var comprador =""
    var numNecesidad=String(req.body.results[4]['Número de necesidad'])
    var cantidadsolicitada=String(req.body.results[0]['Cantidad de pedido'])
    var cantidadfaltante= String(req.body.results[0]['Por entregar (cantidad)'])
    var cantidadentregada=0
    if(numNecesidad !== "undefined"){
        proyecto=numNecesidad.slice(0,3)
        comprador=numNecesidad.slice(-3)
    }
    if( cantidadsolicitada != "undefined" && cantidadentregada!="undefined"){
        cantidadentregada=parseInt(cantidadsolicitada)-parseInt(cantidadfaltante)
    }
    console.log(String(req.body.results[0]['Fecha documento']))
    var orderDefault = {
        oc: req.body.results[0]['Documento compras'],
        position: req.body.results[0]['Posición'],
        solped: req.body.results[0]['Solicitud de pedido'],
        proyecto: proyecto,//primeros 3 números
        documentdate: req.body.results[0]['Fecha documento'],
        proveedor: req.body.results[0]['Proveedor/Centro suministrador'],
        description: req.body.results[0]['Texto Breve'],
        deliverydate: req.body.results[0]['Fecha de entrega'],
        promisedate: req.body.results[0]['Fecha de entrega'],
        forecast: "",//manual
        estado: "",//manual
        comprador: comprador,//últimos 3 números
        cantidadsolicitada: req.body.results[0]['Cantidad de pedido'],
        cantidadentregada:  cantidadentregada,
        cantidadfaltante: req.body.results[0]['Por entregar (cantidad)'],
        tipodespacho: "",//manual
        guia: 0,//manual
        comentario: ""//manual
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