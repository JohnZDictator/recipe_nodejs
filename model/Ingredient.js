const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    ingredient: {
        type: String,
        required: true,
        min: 6,
        max: 225
    },
    recipeId: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);