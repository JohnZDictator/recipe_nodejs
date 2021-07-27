const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
    step: {
        type: String,
        min: 3,
        max: 225,
        required: true
    },
    recipeId: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    },
    chef: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Step', stepSchema);