const express = require('express');
const router = express.Router();
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");


//1. FATCH ALL NOTES BY USING THIS API : /api/notes/getnotes  LOGIN-REQUIRED
router.get('/getnotes' , async (req,res)=>{
    try {
        const notes = await Note.find({User : req.user})
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal Server error occured" })
    }
})

//2. CREATE A NOTE BY USING THIS API : /api/notes/addnote  LOGIN-REQUIRED
router.post('/addnote' , fetchuser , [
    body('title', 'Title must be at leat 3 chracters').isLength({ min: 3 }),
    body('description', 'Description must be at leat 5 chracters').isLength({ min: 5 }),
] , async (req,res)=>{
    try {
        const errors = validationResult(req);
        const {title , description , tag} = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        let note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal Server error occured" })
    }
})

//3. DELETE A NOTE BY USING THIS API : /api/notes/deletenote  LOGIN-REQUIRED
//4. UPDATE A NOTE BY USING THIS API : /api/notes/updatenote  LOGIN-REQUIRED
module.exports = router;