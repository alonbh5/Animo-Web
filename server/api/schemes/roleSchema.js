const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    role_id: {type: Number, require: true},    
    Permissions: {type: Array, require: true},
    role_type: {type: String, require: true},   
});

module.exports = mongoose.model("Roles",roleSchema);
