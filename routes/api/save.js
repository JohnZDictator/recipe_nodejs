const router = require('express').Router();
const { getSaves, getSaveById, createOrDeleteSave } = require('../../controllers/save_controller');
const { verify } = require('../auth/verify');

router.get('/', getSaves);
router.post('/', verify, createOrDeleteSave);
router.get('/:id', getSaveById);

module.exports = router;