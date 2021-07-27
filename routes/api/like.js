const router = require('express').Router();
const { getLikes, getLikeById, createOrDeleteLike } = require('../../controllers/like_controller');
const { verify } = require('../auth/verify');

router.get('/', getLikes);
router.post('/', verify, createOrDeleteLike);
router.get('/:id', getLikeById);

module.exports = router;