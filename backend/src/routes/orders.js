const express = require('express');
const order = require('../models/order');
const router = express.Router();
const orderSchema = require('../models/order')


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