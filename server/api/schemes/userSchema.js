const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    role_id: { type: Number, require: true },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    age: { type: Number, min: 1, max: 120, require: true },
    gender: { type: String, require: true },
    persQuiz: { type: Array, require: false, default: [] },
    personality: { type: String, require: false, default: "" },
    getToKnowState: { type: String, require: false, default: "uninitialized" },
    online: { type: Boolean, require: false, default: undefined },
    confirm: { type: Boolean, require: true, default: false },
    aboutMe: {type: String, require: false, default: ""}
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model("Users", userSchema);
