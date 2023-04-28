const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body , validationResult } = require('express-validator');

router.post('/' ,[
    body('name' ,'Name must be at leat 3 chracter').isLength({min : 3}),
    body('email','Email must be unique').isEmail(),
    body('password','Password must be at leat 5 chracter').isLength({min : 5})
] , (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    }).then(user=>res.json(user))
    .catch(err=>{console.log(err)
        res.json({error : "Please enter a unique value for email" , message: err.message})})
        
    // const User = User(req.body);
    // user.save();
    // console.log(req.body)
    // res.json(req.body);
})

module.exports = router;