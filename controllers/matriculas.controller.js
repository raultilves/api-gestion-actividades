const matriculasController = {}

const Matricula = require('../models/Matricula')
const Alumno = require('../models/Usuario')
const Modulo = require('../models/Modulo')
const { isValidObjectId } = require('mongoose')

matriculasController.listAll = async (req, res) => {
    try {
        const matriculas = await Matricula.find({})
        res.status(200).send(matriculas)
    } catch (err) {
        return res.status(400).send(err)
    }
}

matriculasController.listByModulo = async (req, res) => {
    try {
        const query = req.params.modulo_id
        const matricula = await Matricula.find({ modulo_id: query })
        res.status(200).send(matricula)
    } catch (err) {
        return res.status(400).send(err)
    }
}

matriculasController.getOne = async (req, res) => {
    try {
        const matricula = await Matricula.findById(req.params.id)
        if (matricula != null) {
            res.status(200).send(matricula)
        } else {
            res.status(400).send("No hemos encontrado lo que andabas buscando")
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}

matriculasController.postMatricula = async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.body.alumno_id)
        const modulo = await Modulo.findById(req.body.modulo_id)

        if (alumno != null && modulo != null) {
            const matricula = new Matricula({
                alumno_id: req.body.alumno_id,
                modulo_id: req.body.modulo_id
            })
            const savedMatricula = await matricula.save()
            res.status(200).send(savedMatricula._id)
        } else {
            res.status(400).send("El alumno o módulo especificado es erróneo")
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

matriculasController.updateMatricula = async (req, res) => {
    const query = req.params.id
    const update = req.body

    const queryValido = isValidObjectId(query)
    const moduloValido = isValidObjectId(update.modulo_id)
    const alumnoValido = isValidObjectId(update.alumno_id)

    if (queryValido && moduloValido && alumnoValido) {
        const alumno = await Alumno.findById(update.alumno_id)
        if (alumno.rol == "alumno") {
            try {
                const updatedMatricula = await Matricula.findByIdAndUpdate(query, update)
                res.status(400).send({ matricula: updatedMatricula._id })
            } catch (err) {
                return res.status(400).send(err)
            }
        } else {
            return res.status(400).send("El usuario debe ser alumno, no profesor")
        }
    } else {
        res.status(400).send("Los datos no son del formato ObjectId")
    }
}

matriculasController.deleteMatricula = async (req, res) => {
    try {
        const target = await Matricula.findById(req.params.id)
        if (target) {
            await Matricula.findByIdAndDelete(req.params.id)
            res.status(200).send("Matrícula eliminada exitosamente")
        } else {
            return res.status(400).send("No hemos podido encontrar esta matrícula")
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports = matriculasController