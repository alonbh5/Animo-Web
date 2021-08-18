const mongoose = require('mongoose');

const persDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {type: String, require: true},     //personality 
    descritpion: {type: String, require: true}, //short info about the personality
    properites: {type: Array, require: true},  //    
    link: {type: String, require: false,defult: ""},
    alias: {type: String, require: false,defult: ""},  
});

module.exports = mongoose.model("Personality-Data",persDataSchema);