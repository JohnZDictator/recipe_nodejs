const adminController = async (req, res, next) => {
    // res.status(200).json(req.user);
    res.status(200).send('welcome admin');
}

module.exports.adminController = adminController;