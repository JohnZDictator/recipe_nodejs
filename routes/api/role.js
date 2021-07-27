const router = require('express').Router();
const { getRoles, getRole, createRole, updateRole, deleteRole, grantRole, revokeRole } = require('../../controllers/role_controller');
const { isAdmin } = require('../auth/authorized');
const { verify } = require('../auth/verify');

router.get('/', verify, isAdmin, getRoles);
router.post('/', verify, isAdmin, createRole);
router.get('/:id', verify, isAdmin, getRole);
router.put('/:id', verify, isAdmin, updateRole);
router.delete('/:id', verify, isAdmin, deleteRole);

// Granting and Revoking roles
router.patch('/grantRole', verify, isAdmin, grantRole);
router.patch('/revokeRole', verify, isAdmin, revokeRole);

module.exports = router;