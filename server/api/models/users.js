const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    role_id: {type: String, require: true},    
    first_name: {type: String, require: true},
    last_name: {type: String, require: true},   
    email: {type: String, require: true},
    password: {type: String, require: true},   
    age: {type: String, require: true},
    gender: {type: String, require: true},   
    permissions_to_app: {type: Array, require: false},  
});

module.exports = mongoose.model("Users",userSchema);