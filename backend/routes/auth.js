const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
var CryptoJS = require("crypto-js")
var jwt = require('jsonwebtoken');
const JWT_SECRET = "jwtsecret"
const fetchuser = require("../middleware/fetchuser");

//1. CREATE A USER BY USING THIS API : /api/auth/createuser  NO-LOGIN-REQUIRED
router.post('/createuser', [
    body('name', 'Name must be at leat 3 chracter').isLength({ min: 3 }),
    body('email', 'Email must be unique').isEmail(),
    body('password', 'Password must be at leat 5 chracter').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // CHECK WEATHER THE USER WITH THIS EMAIL IS ALREADY EXIST OR NOT
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({ error: "Sorry a user with this email already exist" })
        }
        // CREATING A NEW USER 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            // password : req.body.password,
            password: CryptoJS.AES.encrypt(req.body.password, 'secret123').toString()
        })
        const data = {
            user: {
                id: user.id
            }
        }
        var token = jwt.sign(data, JWT_SECRET);
        res.json({ token })
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal Server error occured" })
    }
})


//2. LOGIN A USER BY USING THIS API : /api/auth/login  NO-LOGIN-REQUIRED
router.post('/login', [
    body('email', 'Email must be unique').isEmail(),
    body('password', 'password can not be null').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ error: "Invalid credentials" })
        }

        const bytes = CryptoJS.AES.decrypt(user.password, 'secret123');
        var decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if (req.body.password != decryptedPass) {
            res.status(400).json({ error: "Invalid credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        var token = jwt.sign(data, JWT_SECRET);
        res.json({ token })
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal Server error occured" })
    }
})

//3. LOGIN A USER BY USING THIS API : /api/auth/getuser  LOGIN-REQUIRED
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;