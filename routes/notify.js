const router = require('express').Router()
const notifyCtrl = require('../controllers/notify')
const auth = require('../middleware/auth')

router.post('/notify', auth, notifyCtrl.createNotify)
router.delete('/notify/:id', auth, notifyCtrl.deleteNotify)
router.get('/notifies', auth, notifyCtrl.getNotify)
router.patch('/isReadNotify/:id', auth, notifyCtrl.isReadNotify)
router.delete('/deleteAllNotify', auth, notifyCtrl.deleteAllNotify)

module.exports = router