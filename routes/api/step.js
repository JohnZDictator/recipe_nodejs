const router = require('express').Router();
const { getSteps, getStepById, createStep, updateStep, deleteStep } = require('../../controllers/step_controller');
const { verify } = require('../auth/verify');
const { isChef } = require('../auth/authorized');

router.get('/', getSteps);
router.post('/', verify, isChef, createStep);
router.get('/:id', getStepById);
router.put('/:id', verify, isChef, updateStep);
router.delete('/:id', verify, isChef, deleteStep);

module.exports = router;