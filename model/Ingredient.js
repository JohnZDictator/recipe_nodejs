const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    ingredient: {
        type: String,
        required: true,
        min: 3,
        max: 225
    },
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    },
    chef: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);