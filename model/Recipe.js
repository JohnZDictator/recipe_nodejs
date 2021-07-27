const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    description: {
        type: String,
        required: true,
        min: 6
    },
    image: {
        type: String,
    },
    Chef: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    ingredients: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ingredient'
    }],
    step: [{
        type: mongoose.Types.ObjectId,
        ref: 'Step'
    }]
});

module.exports = mongoose.model('Recipe', recipeSchema);