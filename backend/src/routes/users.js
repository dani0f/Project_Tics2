const express = require('express');
const user = require('../models/Users');
const router = express.Router();
const UserSchema = require('../models/Users')


router.get('/', async (req,res) => {
   const users = await UserSchema.find();
   res.json(users);
});

router.get('/:id', async (req,res) => {
    const users = await UserSchema.findById(req.params.id);
    res.json(users);
});

router.post('/',async (req,res) =>{
    const users = new UserSchema(req.body);
    await users.save()
    res.json({
        status:'user Saved'
    });
});
router.put('/:id', async (req,res) =>{
    await UserSchema.findByIdAndUpdate(req.params.id , req.body);
    res.json({
        status: 'user Update'
    })

});
router.delete('/:id',async (req, res) =>{
    await UserSchema.findByIdAndRemove(req.params.id);
    res.json({
        status: 'user Removed'
    })
});

module.exports = router;