const mongoose = require('mongoose');

const personalEmotionalDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data: { type: String, require: true },
    emotion: { type: String, require: true },
    personality: { type: String, require: true }    
});

module.exports = mongoose.model("personal_Emotional_Data", personalEmotionalDataSchema);