const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: { type: String, require: true },
    keyWords: { type: [String], require: true, default: "" },
    isPersonal: { type: Boolean, require: false, default: false }, 
    indexInQuestion: { type: [Number], require: false, default: []}   
});

module.exports = mongoose.model("Bot-Conversation", ConversationSchema);