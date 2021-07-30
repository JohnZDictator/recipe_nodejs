const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const valid = req.user.Roles === '60fbccf6e1a6d529aeaf85fd';

    if (valid) {
        next();
    } else {
        res.status(403).send('Access Denied Since You are not an Admin');
    }
}

const isChef = (req, res, next) => {
    const valid = req.user.Roles === '60f93ca3fe0913d29da9c223';

    if (valid) {
        next();
    } else {
        res.status(403).send('Access Denied Since You are not a Chef');
    }
}

const isUser = (req, res, next) => {
    const valid = req.user.Roles === '60f93d29fe0913d29da9c227';

    if (valid) {
        next();
    } else {
        res.status(403).send('Access Denied Since You are not a User');
    }
}

module.exports.isAdmin = isAdmin;
module.exports.isChef = isChef;
module.exports.isUser = isUser;