const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    image: {
        type: String,
    },
    address: {
        type: String,
        min: 6,
        max: 255
    },
    description: {
        type: String,
        min: 6,
    },
    Recipes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    }],
    Role: {
        type: mongoose.Types.ObjectId,
        ref: 'Role'
    }
});

module.exports = mongoose.model('User', userSchema);