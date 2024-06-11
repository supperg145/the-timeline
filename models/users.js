const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1
    },
    message: {
        type: String,
        required: true,
        minLength: 25
    },
    comment: {
        type: String,
        
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
