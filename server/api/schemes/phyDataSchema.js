const mongoose = require('mongoose');

const phyDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data_type: {type: String, require: true},
    link: {type: String, require: false},
    author: {type: String, require: false},
    title: {type: String, require: true},
    emotions: {type: String, require: false},
    confirm: {type: Boolean, require: false, default: false},
    img: {type: String, require: false}
});

module.exports = mongoose.model('PhyData',phyDataSchema,"Physiological Data");
