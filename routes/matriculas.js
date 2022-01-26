const router = require('express').Router()
const verify = require('./verifyToken')

const matriculasController = require('../controllers/matriculas.controller')

router.get('/', verify, matriculasController.listAll)
router.get('/:modulo_id', verify, matriculasController.getOne)
router.post('/', verify, matriculasController.postMatricula)
router.delete('/:alumno_id', verify, matriculasController.deleteMatricula)

module.exports = router