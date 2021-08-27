const mongoose = require('mongoose');

const answersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String, require: true },
    questionindex: { type: String, require: true },
    answers: { type: Array, require: false, default: [] },
});

module.exports = mongoose.model("Users-Answers", answersSchema);