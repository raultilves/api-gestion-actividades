const router = require('express').Router()

const verify = require('./verifyToken')
const authController = require('../controllers/auth.controller')

router.get('/:id', verify, authController.getFullUser)
router.post('/register', authController.postRegister)
router.post('/login', authController.postLogin)

module.exports = router;