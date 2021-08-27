const mongoose = require('mongoose');

const PresonalQuestionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: { type: String, require: true },
    useranswer: { type: String, require: true, default: "" }    
});

module.exports = mongoose.model("Bot-Personal-Questions", PresonalQuestionSchema);