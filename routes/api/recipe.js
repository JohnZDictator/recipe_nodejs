const router = require('express').Router();
const { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } = require('../../controllers/recipe_controller');
const { isChef } = require('../auth/authorized');
const { verify } = require('../auth/verify');

router.get('/', getRecipes);
router.post('/', verify, isChef, createRecipe);
router.get('/:id', getRecipeById);
router.put('/:id', verify, isChef, updateRecipe);
router.delete('/:id', verify, isChef, deleteRecipe);

module.exports = router;