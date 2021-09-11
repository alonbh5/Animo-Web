const mongoose = require('mongoose');

const analyzeAnswersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String, require: true },
    time: { type: Date, require: true },
    answers: { type: Array, require: false, default: [] },
    currentUserIndex: { type: Number, require: true }
});

module.exports = mongoose.model("Users-Analyze-Answers", analyzeAnswersSchema);