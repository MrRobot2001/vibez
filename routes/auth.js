const router = require('express').Router()
const authCtrl = require('../controllers/auth')

router.post('/signup',authCtrl.signup)

router.post('/login',authCtrl.login)

router.post('/logout',authCtrl.logout)

router.post('/refresh_token',authCtrl.generateAccessToken)

module.exports = router