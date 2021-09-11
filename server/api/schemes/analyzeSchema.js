const mongoose = require('mongoose');

const analyzeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    emotionId: { type: String, require: true },
    question: { type: String, require: true }
});

module.exports = mongoose.model("Bot-Analyze-Question", analyzeSchema);