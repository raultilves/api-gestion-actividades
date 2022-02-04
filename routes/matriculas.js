const router = require('express').Router()
const verify = require('./verifyToken')

const matriculasController = require('../controllers/matriculas.controller')

router.get('/', verify, matriculasController.listAll)
router.get('/byid/:id', verify, matriculasController.getOne)
router.get('/bymodulo/:modulo_id', verify, matriculasController.listByModulo)
router.get('/byalumno/:alumno_id', verify, matriculasController.listByAlumno)
router.post('/', verify, matriculasController.postMatricula)
router.put('/:id', verify, matriculasController.updateMatricula)
router.delete('/:id', verify, matriculasController.deleteMatricula)

module.exports = router