const Joi = require('joi');

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    });
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(6).max(1024).required()
    });

    return schema.validate(data);
}

const profileValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(225).required(),
        password: Joi.string().min(6).max(1024).required(),
        image: Joi.string(),
        description: Joi.string(),
        address: Joi.string()
    });

    return schema.validate(data);
}

const recipeValidation = data => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(6).required(),
        image: Joi.string(),
        chef: Joi.string()
    });

    return schema.validate(data);
}

const ingredientValidation = data => {
    const schema = Joi.object({
        ingredient: Joi.string().min(6).max(255).required(),
        recipeId: Joi.string()
    });

    return schema.validate(data);
}

const stepValidation = data => {
    const schema = Joi.object({
        step: Joi.string().min(3).max(225).required(),
        recipeId: Joi.string()
    });

    return schema.validate(data);
}

const roleValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(225).required(),
        description: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

const subscribeValidation = data => {
    const schema = Joi.object({
        userId: Joi.string(),
        chefId: Joi.string()
    });

    return schema.validate(data);
}

const likeValidation = data => {
    const schema = Joi.object({
        userId: Joi.string(),
        chefId: Joi.string()
    }); 

    return schema.validate(data);
}

const saveValidation = data => {
    const schema = Joi.object({
        userId: Joi.string(),
        recipeId: Joi.string()
    }); 

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.profileValidation = profileValidation;
module.exports.recipeValidation = recipeValidation;
module.exports.stepValidation = stepValidation;
module.exports.ingredientValidation = ingredientValidation;
module.exports.roleValidation = roleValidation;
module.exports.subscribeValidation = subscribeValidation;
module.exports.likeValidation = likeValidation;
module.exports.saveValidation = saveValidation;

