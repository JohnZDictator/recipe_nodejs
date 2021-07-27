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
    // Recipes: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Recipe'
    // }],
    Roles: {
        type: mongoose.Types.ObjectId,
        ref: 'Role',
        default: mongoose.Types.ObjectId('60f93d29fe0913d29da9c227')
    },
}); 

module.exports = mongoose.model('User', userSchema);