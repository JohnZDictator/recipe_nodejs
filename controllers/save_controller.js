const Save = require('../model/Save');
const User = require('../model/User');
const Recipe = require('../model/Recipe');
const { saveValidation } = require('../validation');

const getSaves = async (req, res, next) => {
    const saves = await Save.find({ userId: req.body.userId });
    if (!saves) return res.status(400).send('No Saves Found');

    return res.status(200).json(saves);
}

const getSaveById = async (req, res, next) => {
    const save = await Save.findOne({ _id: req.params.id });
    if (!save) return res.status(400).send('No Save Found');

    return res.status(200).json(save);
}

const createOrDeleteSave = async (req, res, next) => {
    const { saveError } = saveValidation(req.body);
    if (saveError) return res.status(400).send(saveError.details[0].message);

    const userExist = await User.findOne({ _id: req.user._id });
    if (!userExist) return res.status(400).send('User Not Found');

    const recipeId = await Recipe.findOne({ _id: req.body.recipeId });
    if (!recipeId) return res.status(400).send('Recipe Not Found');

    const saveExist = await Save.findOne({ userId: req.user._id, recipeId: req.body.recipeId });

    if (!saveExist) {
        const save = new Save({
            userId: req.user._id,
            recipeId: req.body.recipeId
        });

        try {
            const saveSaved = await save.save();
            return res.status(200).json(saveSaved);
        } catch (saveErr) {
            return res.status(400).send(saveErr);
        }
    } else {
        try {
            const saveRemoved = await Save.deleteOne({ userId: req.user._id, recipeId: req.body.recipeId });
            return res.status(200).json(saveRemoved);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

}

module.exports.getSaves = getSaves;
module.exports.getSaveById = getSaveById;
module.exports.createOrDeleteSave = createOrDeleteSave;



