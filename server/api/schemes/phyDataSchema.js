const mongoose = require('mongoose');

const phyDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data_type: {type: String, require: true},
    link: {type: String, require: true},
    author: {type: String, require: true},
    title: {type: String, require: true},
    emotions: {type: String, require: true},
    created_by: {type: String, require: true},
    confirm: {type: Boolean, require: false, default: false},
});

module.exports = mongoose.model('PhyData',phyDataSchema,"Physiological Data");
