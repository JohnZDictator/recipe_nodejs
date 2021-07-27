const mongoose = require('mongoose');
const Ingredient = require('../model/Ingredient');
const Recipe = require('../model/Recipe');
const User = require('../model/User');

const { ingredientValidation } = require('../validation');

const getIngredients = async (req, res, next) => {
    const recipeExist = await Recipe.findOne({ _id: req.body.recipeId });
    if (!recipeExist) return res.status(400).send('Recipe Not Found');

    const ingredients = await Ingredient.find({ recipe: req.body.recipeId });
    if (!ingredients) return res.status(400).send('Ingredients Not Found');

    return res.status(200).json(ingredients);
}

const getIngredient = async (req, res, next) => {
    const ingredient = await Ingredient.findOne({ _id: req.params.id });
    if (!ingredient) return res.status(400).send('No Ingredient Found');

    return res.status(200).json(ingredient);
}

const createIngredient = async (req, res, next) => {
    // 1. input validation
    // 1.1 validating ingredient
    const { ingredientError } = ingredientValidation(req.body);
    if (ingredientError) return res.status(400).send(ingredientError.details[0].message);

    // check if recipe exist first
    const recipeExist = await Recipe.findOne({ _id: req.body.recipeId });
    if (!recipeExist) return res.status(400).send('Recipe Not Found');

    const chefExist = await User.findOne({ _id: req.user._id });
    if (!chefExist) return res.status(400).send('Chef Not Found');

    const validOwner = recipeExist.Chef == req.user._id;
    if (!validOwner) return res.status(400).send('Access Denied: Chef is not the Owner of the Recipe');

    const ingredient = new Ingredient({
        ingredient: req.body.ingredient,
        recipe: req.body.recipeId,
        chef: req.user._id
    });

    try {
        // creating ingredient
        ingredientSaved = await ingredient.save();
    } catch (ingredientErr) {
        return res.status(400).send(ingredientErr);
    }

    return res.status(200).json(ingredientSaved);
}

const updateIngredient = async (req, res, next) => {
    var updateIngredient;

    // 1. input validation
    // 1.1 validating recipe
    const { ingredientError } = ingredientValidation(req.body);
    if (ingredientError) return res.status(400).send(ingredientErorr.details[0].message);

    // Check if recipe exist
    const ingredientExist = await Ingredient.findOne({ _id: req.params.id });
    if (!ingredientExist) return res.status(400).send('Update Failed: Ingredient Not Found');

    const chefExist = await User.findOne({ _id: req.user._id });
    if (!chefExist) return res.status(400).send('Chef Not Found');

    const validOwner = ingredientExist.chef == req.user._id;
    if (!validOwner) return res.status(400).send('Access Denied Can\'t update others ingredient');

    try {
        updateIngredient = await Ingredient.updateOne(
            { _id: req.params.id },
            { $set: { ingredient: req.body.ingredient } }
        );
    } catch (updateErr) {
        return res.status(400).send(updateErr);
    }
    return res.status(200).send(updateIngredient);
}

const deleteIngredient = async (req, res, next) => {

    const ingredientExists = await Ingredient.findOne({ _id: req.params.id });
    if (!ingredientExists) return res.status(400).send('Delete Failed: Recipe Not Found');

    const chefExist = await User.findOne({ _id: req.user._id });
    if (!chefExist) return res.status(400).send('Chef Not Found');

    const validOwner = ingredientExists.chef == req.user._id;
    if (!validOwner) return res.status(400).send('Access Denied: Can\'t delete others ingredient');

    try {
        const ingredientRemoved = await Ingredient.deleteOne({ _id: req.params.id });
        return res.status(200).json(ingredientRemoved);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.getIngredients = getIngredients;
module.exports.getIngredient = getIngredient;
module.exports.createIngredient = createIngredient;
module.exports.updateIngredient = updateIngredient;
module.exports.deleteIngredient = deleteIngredient;



