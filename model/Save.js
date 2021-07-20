const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    recipeId: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    }
});

module.exports = mongoose.model('Save', saveSchema);