const router = require('express').Router();
const { getIngredients, getIngredient, createIngredient, updateIngredient, deleteIngredient } = require('../../controllers/ingredient_controller');
const { isChef } = require('../auth/authorized');
const { verify } = require('../auth/verify');

router.get('/', getIngredients);
router.post('/', verify, isChef, createIngredient);
router.get('/:id', getIngredient);
router.put('/:id', verify, isChef, updateIngredient);
router.delete('/:id', verify, isChef, deleteIngredient);

module.exports = router;