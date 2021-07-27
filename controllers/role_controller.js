const mongoose = require('mongoose');

const Role = require('../model/Role');
const User = require('../model/User');
const { roleValidation } = require('../validation');

const getRoles = async (req, res, next) => {
    const roles = await Role.find();
    if (!roles) return res.status(400).send('No Roles created');

    return res.status(200).json(roles);
}

const getRole = async (req, res, next) => {
    const role = await Role.find({ _id: req.params.id });
    if (!role) return res.status(400).send('Role Not Found');

    return res.status(200).json(role);
}

const createRole = async (req, res, next) => {
    const { roleError } = roleValidation(req.body);
    if (roleError) return res.status(400).send('Invalid Input For Role Creation');

    const roleExist = await Role.findOne({ name: req.body.name });
    if (roleExist) return res.status(400).send('Role Already Created, Create Another Role');

    const role = new Role({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const roleSaved = await role.save();
        res.status(200).json(roleSaved);
    } catch (err) {
        res.status(400).send(err);
    }
}

const updateRole = async (req, res, next) => {
    const roleExist = await Role.find({ _id: req.params.id });
    if (!roleExist) return res.status(400).send('Role Not Found');

    try {
        const updateRole = await Role.updateOne(
            { _id: req.params.id },
            {
                name: req.body.name,
                description: req.body.description,
            }
        );
        return res.status(200).json(updateRole);
    } catch (err) {
        res.status(400).send(err);
    }
}

const deleteRole = async (req, res, next) => {
    const roleExist = await Role.find({ _id: req.params.id });
    if (!roleExist) return res.status(400).send('Role Not Found');

    try {
        const removeRole = await Role.deleteOne({ _id: req.params.id });
        res.status(200).json(removeRole);
    } catch (err) {
        res.status(400).send(err);
    }
}

const grantRole = async (req, res, next) => {
    const userExist = await User.findOne({ _id: req.body.userId });
    if (!userExist) return res.status(400).send('User Not Found');

    const roleExist = await Role.findOne({ _id: req.body.roleId });
    if (!roleExist) return res.status(400).send('Role Not Found');

    try {
        const updateUserRole = await User.updateOne(
            { _id: req.body.userId },
            { Roles: req.body.roleId }
        );
        updateUserRole.save();
        res.status(200).json(updateUserRole);
    } catch (err) {
        res.status(400).send(err);
    }

}

const revokeRole = async (req, res, next) => {
    const userExist = await User.findOne({ _id: req.body.userId });
    if (!userExist) return res.status(400).send('User Not Found');

    try {
        const removeUserRole = await User.updateOne(
            { _id: req.body.userId },
            { Roles: null }
        );
        removeUserRole.save();
        res.status(200).json(removeUserRole);
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports.getRoles = getRoles;
module.exports.getRole = getRole;
module.exports.createRole = createRole;
module.exports.updateRole = updateRole;
module.exports.deleteRole = deleteRole;

module.exports.grantRole = grantRole;
module.exports.revokeRole = revokeRole;


