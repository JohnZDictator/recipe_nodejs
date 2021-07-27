const router = require('express').Router();
const { adminController } = require('../../controllers/admin_controller');
const { verify } = require('../auth/verify');
const { isAdmin } = require('../auth/authorized');

router.get('/me', verify, isAdmin, adminController);

module.exports = router;