const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 225
    },
    description: {
        type: String,
        required: true,
        min: 6
    }
});

module.exports = mongoose.model('Role', roleSchema);