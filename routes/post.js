const router = require('express').Router()
const postCtrl = require('../controllers/post')
const auth = require('../middleware/auth')

router.route('/posts')
.post(auth, postCtrl.createPost)
.get(auth, postCtrl.getPosts)

router.patch('/post/:id/like', auth, postCtrl.likePost)
router.patch('/post/:id/unlike', auth, postCtrl.unLikePost)
router.get('/user_posts/:id', auth, postCtrl.getUserPosts)
router.route('/post/:id')
.patch(auth, postCtrl.updatePosts)
.get(auth, postCtrl.getPost)
.delete(auth, postCtrl.deletePost)
router.get('/post_explore', auth, postCtrl.getPostExplore)
router.patch('/savePost/:id', auth, postCtrl.savePost)
router.patch('/unSavePost/:id', auth, postCtrl.unSavePost)
router.get('/getSavePosts', auth, postCtrl.getSavePosts)
module.exports = router