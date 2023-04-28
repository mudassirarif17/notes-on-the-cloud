const mongoose = require ("mongoose");
const {Schema} = mongoose;

const NotesSchema = new mongoose.Schema({
    title:{type: String , required: true},
    desc:{type: String , required : true},
    tag:{type: String , default:"General"},
    date:{type: Date , default: Date.now}
}, {timeStamps: true})

module.exports = mongoose.model('Notes' , NotesSchema);
