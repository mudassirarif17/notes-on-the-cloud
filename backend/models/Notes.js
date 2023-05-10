const mongoose = require ("mongoose");
// const {Schema} = mongoose;

const NotesSchema = new mongoose.Schema({
    user:{type : mongoose.Schema.Types.ObjectId , ref : 'User'},
    title:{type: String , required: true},
    description:{type: String , required: true},
    tag:{type: String , default:"General"},
    date:{type: Date , default: Date.now}
}, {timeStamps: true})

// module.exports = mongoose.model('Notes' , NotesSchema);
const Notes = mongoose.model('Notes' , NotesSchema);
module.exports = Notes;
