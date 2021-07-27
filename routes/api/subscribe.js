const router = require('express').Router();
const { getSubscribes, getSubscribers, getSubscribeById, createOrDeleteSubscribe } = require('../../controllers/subscribe_controller');
const { verify } = require('../auth/verify');

router.get('/user/', getSubscribes);
router.get('/chef/', getSubscribers);
router.post('/', verify, createOrDeleteSubscribe);
router.get('/:id', getSubscribeById);

module.exports = router;