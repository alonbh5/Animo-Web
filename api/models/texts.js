const mongoose = require('mongoose');

const textSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, require: true},
    descruotion: {type: String, require: true},
    content: {type: String, require: true},
});

module.exports = mongoose.model('Text',textSchema);
