const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
    step: {
        type: String,
        min: 3,
        max: 225
    },
    recipeId: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    }
});

module.exports = mongoose.model('Step', stepSchema);