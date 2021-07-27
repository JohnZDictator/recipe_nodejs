const Step = require('../model/Step');
const Recipe = require('../model/Recipe');
const User = require('../model/User');
const { stepValidation } = require('../validation');

const getSteps = async (req, res, next) => {
    const steps = await Step.find({ recipeId: req.body.recipeId });
    if (!steps) return res.status(400).send('No Steps Found');

    return res.status(200).json(steps);
}

const getStepById = async (req, res, next) => {
    const step = await Step.findOne({ _id: req.params.id });
    if (!step) return res.status(400).send('No Steps Found');

    return res.status(200).json(step);
}

const createStep = async (req, res, next) => {
    const { stepError } = stepValidation(req.body);
    if (stepError) return res.status(400).send(stepError.details[0].message);

    const recipeExist = await Recipe.findOne({ _id: req.body.recipeId });
    if (!recipeExist) return res.status(400).send('Recipe Not Found');

    const validOwner = recipeExist.Chef == req.user._id;
    if (!validOwner) return res.status(400).send('Access Denied: Chef Not the Owner of the Recipe');

    const step = new Step({
        step: req.body.step,
        recipeId: req.body.recipeId,
        chef: req.user._id
    });

    try {
        const stepSaved = await step.save();
        return res.status(200).json(stepSaved);
    } catch (stepErr) {
        return res.status(400).send(stepErr);
    }
}

const updateStep = async (req, res, next) => {
    const { stepError } = stepValidation(req.body);
    if (stepError) return res.status(400).send(stepErorr.details[0].message);

    const stepExist = await Step.findOne({ _id: req.params.id });
    if (!stepExist) return res.status(400).send('Update Failed: Step Not Found');

    const chefExist = User.findOne({ _id: req.user._id });
    if (!chefExist) return res.status(400).send('Chef Not Found');

    const validOwner = stepExist.chef == req.user._id;
    if (!validOwner) return res.status(400).send('Access Denied: Not Owner Of Content Update Failed');

    try {
        const updateStep = await Step.updateOne(
            { _id: req.params.id },
            { $set: { step: req.body.step } }
        );
        return res.status(200).send(updateStep);
    } catch (updateErr) {
        return res.status(400).send(updateErr);
    }
}

const deleteStep = async (req, res, next) => {
    const stepExists = await Step.findOne({ _id: req.params.id });
    if (!stepExists) return res.status(400).send('Delete Failed: Step Not Found');

    const chefExist = User.findOne({ _id: req.user._id });
    if (!chefExist) return res.status(400).send('Chef Not Found');

    const validOwner = stepExists.chef == req.user._id;
    if (!validOwner) return res.status(400).send('Access Denied: Not Owner Of Content Delete Failed');

    try {
        const stepRemoved = await Step.deleteOne({ _id: req.params.id });
        return res.status(200).json(stepRemoved);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.getSteps = getSteps;
module.exports.getStepById = getStepById;
module.exports.createStep = createStep;
module.exports.updateStep = updateStep;
module.exports.deleteStep = deleteStep;



