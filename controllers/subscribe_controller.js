const Subscribe = require('../model/Subscribe');
const User = require('../model/User');
const { subscribeValidation } = require('../validation');

const getSubscribes = async (req, res, next) => {
    const subscribes = await Subscribe.find({ userId: req.body.userId });
    if (!subscribes) return res.status(400).send('No Subscribes Found');

    return res.status(200).json(subscribes);
}

const getSubscribers = async (req, res, next) => {
    const subscribers = await Subscribe.find({ chefId: req.body.chefId });
    if (!subscribers) return res.status(400).send('No subscribers Found');

    return res.status(200).json(subscribers);
}

const getSubscribeById = async (req, res, next) => {
    const subscribe = await Subscribe.findOne({ _id: req.params.id });
    if (!subscribe) return res.status(400).send('No Subscriber Found');

    return res.status(200).json(subscribe);
}

const createOrDeleteSubscribe = async (req, res, next) => {
    const chefRole = '60f93ca3fe0913d29da9c223';

    const { subscribeError } = subscribeValidation(req.body);
    if (subscribeError) return res.status(400).send(subscribeError.details[0].message);

    const userExist = await User.findOne({ _id: req.user._id });
    if (!userExist) return res.status(400).send('User Not Found');

    const chefExist = await User.findOne({ _id: req.body.chefId });
    if (!chefExist) return res.status(400).send('Chef Not Found');

    const chefValid = chefExist.Roles.equals(chefRole);
    if (!chefValid) return res.status(400).send('Not A Chef');

    const subscribeExist = await Subscribe.findOne({ userId: req.user._id, chefId: req.body.chefId });

    if (!subscribeExist) {
        const subscribe = new Subscribe({
            userId: req.user._id,
            chefId: req.body.chefId
        });

        try {
            const subscribeSaved = await subscribe.save();
            return res.status(200).json(subscribeSaved);

        } catch (subscribeErr) {
            return res.status(400).send(subscribeErr);
        }
    } else {
        try {
            const subscribeRemoved = await Subscribe.deleteOne({ userId: req.user._id, chefId: req.body.chefId });
            return res.status(200).json(subscribeRemoved);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

}

module.exports.getSubscribes = getSubscribes;
module.exports.getSubscribers = getSubscribers;
module.exports.getSubscribeById = getSubscribeById;
module.exports.createOrDeleteSubscribe = createOrDeleteSubscribe;



