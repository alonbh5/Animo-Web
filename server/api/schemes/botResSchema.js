const mongoose = require('mongoose');

const botResSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    response_type: {type: String, require: true},    
    content: {type: String, require: true},
    response_to: {type: String, require: true}   
});

module.exports = mongoose.model("Bot-Responses",botResSchema);