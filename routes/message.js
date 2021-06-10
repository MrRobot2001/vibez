const router = require('express').Router()
const messageCtrl = require('../controllers/message')
const auth = require('../middleware/auth')

router.post('/message', auth, messageCtrl.createMessage)
router.get('/chats', auth, messageCtrl.getChat)
router.get('/message/:id', auth, messageCtrl.getMessage)
router.delete('/message/:id', auth, messageCtrl.deleteMessage)
router.delete('/chat/:id', auth, messageCtrl.deleteChat)

module.exports = router