const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    recipeId: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    }
});

module.exports = mongoose.model('Like', likeSchema);