const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body , validationResult } = require('express-validator');
var CryptoJS = require("crypto-js")


// CREATE A USER BY USING THIS API : /api/auth/createuser  NO-LOGIN-REQUIRED
router.post('/createuser' ,[
    body('name' ,'Name must be at leat 3 chracter').isLength({min : 3}),
    body('email','Email must be unique').isEmail(),
    body('password','Password must be at leat 5 chracter').isLength({min : 5})
] , async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    // CHECK WEATHER THE USER WITH THIS EMAIL IS ALREADY EXIST OR NOT
    try {
    let user = await User.findOne({email : req.body.email})
    if(user){
        res.status(400).json({error : "Sorry a user with this email already exist"})
    }
    // CREATING A NEW USER 
    user= await User.create({
        name : req.body.name,
        email : req.body.email,
        // password : req.body.password,
        password: CryptoJS.AES.encrypt(req.body.password, 'secret123').toString() 
    })
    res.json(user)
} catch (error) {
    console.error(error.message)
    res.status(500).send({error : "Some error occured"})
} 
})


// LOGIN A USER BY USING THIS API : /api/auth/login  NO-LOGIN-REQUIRED

module.exports = router;