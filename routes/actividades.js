const router = require('express').Router()
const verify = require('./verifyToken')

const actividadesController = require('../controllers/actividades.controller')

router.get('/', verify, actividadesController.listAll)
router.get('/:id', verify, actividadesController.getOne)
router.post('/', verify, actividadesController.postActividad)

module.exports = router