const mongoose = require('mongoose');

const BlacklistedNumberSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    reason: {
        type: String,
        default: 'Not specified'
    },
    blacklistedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BlacklistedNumber', BlacklistedNumberSchema);
