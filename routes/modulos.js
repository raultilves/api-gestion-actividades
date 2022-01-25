const router = require('express').Router()
const verify = require('./verifyToken')

const modulosController = require('../controllers/modulos.controller')

router.get('/', verify, modulosController.listAll)
router.get('/:id', verify, modulosController.getOne)
router.post('/', verify, modulosController.postModulo)
router.put('/:id', verify, modulosController.updateModulo)
router.delete('/:id', verify, modulosController.deleteModulo)

module.exports = router