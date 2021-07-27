const Like = require('../model/Like');
const Recipe = require('../model/Recipe');
const User = require('../model/User');
const { likeValidation } = require('../validation');

const getLikes = async (req, res, next) => {

    const recipeExist = await Recipe.find({ _id: req.body.recipeId });
    if (!recipeExist) return res.status(400).send('No Recipe Found');

    const likes = await Like.find({ recipeId: req.body.recipeId });
    if (!likes) return res.status(400).send('No Likes Found');

    return res.status(200).json(likes);
}

const getLikeById = async (req, res, next) => {
    const like = await Like.findOne({ _id: req.params.id });
    if (!like) return res.status(400).send('No Like Found');

    return res.status(200).json(like);
}

const createOrDeleteLike = async (req, res, next) => {
    const { likeError } = likeValidation(req.body);
    if (likeError) return res.status(400).send(likeError.details[0].message);

    const recipeExist = await Recipe.findOne({ _id: req.body.recipeId });
    if (!recipeExist) return res.status(400).send('Recipe Not Found');

    const userExist = await User.findOne({ _id: req.user._id });
    if (!userExist) return res.status(400).send('User Not Found');

    const likeExist = await Like.findOne({ userId: req.user._id, recipeId: req.body.recipeId });
    // if (likeExist) return res.status(400).send('Like Already Exist');

    if (!likeExist) {
        const like = new Like({
            userId: req.user._id,
            recipeId: req.body.recipeId
        });

        try {
            const likeSaved = await like.save();
            return res.status(200).json(likeSaved);
        } catch (likeErr) {
            return res.status(400).send(likeErr);
        }
    } else {
        const validOwner = likeExist.userId == req.user._id;
        if (!validOwner) return res.status(400).send('Access Denied: Can\'t Delete Others Content');

        try {
            const likeRemoved = await Like.deleteOne({ userId: req.user._id, recipeId: req.body.recipeId });
            return res.status(200).json(likeRemoved);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

}

module.exports.getLikes = getLikes;
module.exports.getLikeById = getLikeById;
module.exports.createOrDeleteLike = createOrDeleteLike;



