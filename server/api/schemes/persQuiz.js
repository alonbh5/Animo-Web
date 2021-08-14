const mongoose = require('mongoose');

const persQuizSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: {type: String, require: true},    
    relateTo: {type: String, require: true},
    opposite: {type: String, require: true},   
});

module.exports = mongoose.model("Personality-Quiz",persQuizSchema);