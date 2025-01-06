const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    displayName: { type: String },
    email: { type: String },
    role: {
        type: String,
        enum: ['ADMIN', 'AUDITOR', 'USER'],
        required: true,
        default: 'USER'
    },
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);
module.exports = User;
