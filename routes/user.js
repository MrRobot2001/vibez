const router = require('express').Router();
const auth = require('../middleware/auth');
const user = require('../controllers/user');

router.get('/search', auth, user.searchUser);
router.get('/user/:id', auth, user.getUser);
router.patch('/user', auth, user.updateUser);
router.patch('/user/:id/follow', auth, user.follow);
router.patch('/user/:id/unfollow', auth, user.unfollow);
router.get('/suggestionUser', auth, user.suggestionUser);

module.exports = router;