const mongoose = require('mongoose');
// const mongoURI = process.env.MONGO_URI
const mongoURI = "mongodb://localhost:27017/iNoteBook"

const connectToMongo = ()=>{
    mongoose.connect( mongoURI , ()=>{
        console.log("Connected to Mongo successfully");
    })
}

module.exports = connectToMongo;