const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { profileValidation } = require('../validation');

// change password
// getFullProifle
// change profile image
// change name
// change address
// change description  

const getAllUsers = async (req, res, next) => {
    const users = await User.find();
    if (!users) return res.status(400).send('Users Not Found');

    return res.status(200).json(users);
}

const getAdmins = async (req, res, next) => {
    const adminRole = '60fbccf6e1a6d529aeaf85fd';
    const admins = await User.find({ Roles: adminRole });
    if (!admins) return res.status(400).send('No Admin Found');

    return res.status(200).json(admins);
}

const getChefs = async (req, res, next) => {
    const chefRole = '60f93ca3fe0913d29da9c223';
    const chefs = await User.find({ Roles: chefRole });
    if (!chefs) return res.status(400).send('No Chefs Found.');

    return res.status(200).json(chefs);
}

const getUsers = async (req, res, next) => {
    const userRole = '60f93d29fe0913d29da9c227';
    const users = await User.find({ Roles: userRole });
    if (!users) return res.status(400).send('No Users Found');

    return res.status(200).json(users);
}

const getUser = async (req, res, next) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send('User Not Found');

    return res.status(200).json(user);
}

const getProfile = async (req, res, next) => {
    const profile = await User.findOne({ _id: req.user._id });
    if (!profile) return res.status(400).send('User Not Found');

    return res.status(200).json(profile);
}

const updateProfile = async (req, res, next) => {
    // input validation
    const { profileError } = profileValidation(req.body);
    if (profileError) return res.status(400).send('Invalid Input For profile update');

    // check if the user is trying to update his or others profile.
    const validProfile = req.user._id === req.params.id;
    if (!validProfile) return res.status(400).send('Access Denied: Can\'t update others profile');

    const profileExist = await User.findOne({ _id: req.params.id });
    if (!profileExist) return res.status(400).send('Update Failed: User not found');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const updateProfile = await User.updateOne(
            { _id: req.params.id },
            {
                name: req.body.name, email: req.body.email,
                password: hashedPassword, image: req.body.image,
                address: req.body.address, description: req.body.description
            }
        );
        updateProfile.save();
        return res.status(200).json(updateProfile);
    } catch (err) {
        return res.status(400).send(err);
    }
}

const deleteProfile = async (req, res, next) => {
    const profileExist = await User.findOne({ _id: req.params.id });
    if (!profileExist) return res.status(400).send('Profile Not Found');

    // check if the user is trying to delete his or others profile, but if user is admin he is allowed.
    const validProfile = req.user._id === req.params.id || req.user.Roles === '60fbccf6e1a6d529aeaf85fd';
    if (!validProfile) return res.status(400).send('Access Denied: Can\'t delete others profile');

    try {
        const removeProfile = await User.deleteOne({ _id: req.params.id });
        return res.status(200).json(removeProfile);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.getAllUsers = getAllUsers;
module.exports.getUsers = getUsers;
module.exports.getChefs = getChefs;
module.exports.getAdmins = getAdmins;
module.exports.getUser = getUser;
module.exports.getProfile = getProfile;
module.exports.updateProfile = updateProfile;
module.exports.deleteProfile = deleteProfile;