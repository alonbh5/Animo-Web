const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: String, require: true},    
    token: {type: String, require: true},
    createdAt: {type: Date, require: true,default: Date.now()}  
});

module.exports = mongoose.model("Tokens",tokenSchema);