const mongoose = require('mongoose');

const persDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {type: String, require: true},    
    personality: {type: String, require: true},
    subTitle: {type: String, require: true},   
    content: {type: String, require: true}, 
    keyWords: {type: Array, require: false,defult: []}, 
    link: {type: String, require: false,defult: ""},
    alias: {type:String, require: false,default: ""} 
});

module.exports = mongoose.model("Personality-Data",persDataSchema);