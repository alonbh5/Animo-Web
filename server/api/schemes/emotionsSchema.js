const mongoose = require('mongoose');

const emotionsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    key_name: {type: String, require: true},    
    name: {type: Array, require: true}     
});

module.exports = mongoose.model("Emotions",emotionsSchema,"Emotions");