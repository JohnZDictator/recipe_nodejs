const Recipe = require('../model/Recipe');
const User = require('../model/User');
const { recipeValidation } = require('../validation');

const getRecipes = async (req, res, next) => {
    console.log('Flutter request reached here');

    const recipes = await Recipe.find({});
    if (!recipes) return res.status(400).send('No Recipes Found');

    console.log('Flutter request reached here');
    return res.status(200).json(recipes);
}

const getRecipeById = async (req, res, next) => {
    const recipe = await Recipe.findOne({ _id: req.params.id });
    if (!recipe) return res.status(400).send('No Recipe Found');

    return res.status(200).json(recipe);
}

const createRecipe = async (req, res, next) => {
    // 1. input validation
    // 1.1 validating recipe
    const { recipeError } = recipeValidation(req.body);
    if (recipeError) return res.status(400).send(recipeError.details[0].message);

    // check if a user with that id exist 
    const userExist = await User.findOne({ _id: req.user._id });
    if (!userExist) return res.status(400).send('User Not Found');

    const recipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        Chef: req.user._id
    });

    try {
        // Here we have successfully created a recipe
        const recipeSaved = await recipe.save();
        return res.status(200).json(recipeSaved);

    } catch (recipeErr) {
        return res.status(400).send(recipeErr);
    }

}

const updateRecipe = async (req, res, next) => {
    const recipeId = req.params.id;

    // 1. input validation
    // 1.1 validating recipe
    const { recipeError } = recipeValidation(req.body);
    if (recipeError) return res.status(400).send(recipeErorr.details[0].message);

    // Check if recipe exist
    const recipeExist = await Recipe.findOne({ _id: recipeId });
    if (!recipeExist) return res.status(400).send('Update Failed: Recipe Not Found');

    // check if chef exist
    const userExist = await User.findOne({ _id: req.user._id });
    if (!userExist) return res.status(400).send('User Not Found');

    // check if the chef is the owner of the recipe
    const validOwner = recipeExist.Chef == req.user._id;
    if (!validOwner) return res.status(400).send('Chef Not The owner of the Recipe');

    try {
        const updateRecipe = await Recipe.updateOne(
            { _id: recipeId },
            {
                $set:
                {
                    title: req.body.title,
                    description: req.body.description,
                    image: req.body.image
                }
            }
        );
        return res.status(204).json(updateRecipe);
    } catch (updateErr) {
        return res.status(400).send(updateErr);
    }
}

const deleteRecipe = async (req, res, next) => {
    const recipeExist = await Recipe.findOne({ _id: req.params.id });
    if (!recipeExist) return res.status(400).send('Delete Failed: Recipe Not Found');

    // check if chef exist
    const userExist = await User.findOne({ _id: req.user._id });
    if (!userExist) return res.status(400).send('User Not Found');

    // check if the chef is the owner of the recipe
    const validOwner = recipeExist.Chef == req.user._id;
    if (!validOwner) return res.status(400).send('Chef Not The owner of the Recipe');

    try {
        const recipeRemoved = await Recipe.deleteOne({ _id: req.params.id });
        return res.status(204).json(recipeRemoved);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.getRecipes = getRecipes;
module.exports.getRecipeById = getRecipeById;
module.exports.createRecipe = createRecipe;
module.exports.updateRecipe = updateRecipe;
module.exports.deleteRecipe = deleteRecipe;

