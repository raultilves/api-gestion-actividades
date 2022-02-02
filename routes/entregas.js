const router = require('express').Router()
const verify = require('./verifyToken')

const entregasController = require('../controllers/entregas.controller')

router.get('/', verify, entregasController.listAll)
router.get('/byid/:id', verify, entregasController.getOne)
router.get('/byactividad/:actividad_id', verify, entregasController.listByActividad)
router.get('/byalumno/:alumno_id', verify, entregasController.listByAlumno)
router.post('/', verify, entregasController.postEntrega)
router.put('/:id', verify, entregasController.updateEntrega)
router.delete('/:id', verify, entregasController.deleteEntrega)

module.exports = router