const router = require('express').Router();
const { getAllUsers, getAdmins, getChefs, getUsers, getUser, getProfile, updateProfile, deleteProfile } = require('../../controllers/user_controller');
const { isAdmin } = require('../auth/authorized');
const { verify } = require('../auth/verify');

router.get('/', verify, isAdmin, getAllUsers);
router.get('/user', verify, isAdmin, getUsers);
router.get('/chef', verify, getChefs);
router.get('/admin', verify, isAdmin, getAdmins);
router.get('/me', verify, getProfile);
router.get('/:id', verify, isAdmin, getUser);
router.put('/:id', verify, updateProfile);
router.delete('/:id', verify, deleteProfile);

module.exports = router;