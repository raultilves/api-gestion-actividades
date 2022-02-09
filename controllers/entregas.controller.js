const entregasController = {}

const Entrega = require('../models/Entrega')
const Alumno = require('../models/Usuario')
const Actividad = require('../models/Actividad')
const { isValidObjectId } = require('mongoose')

entregasController.find = async (req, res) => {
    try {
        const query = req.body
        const entregas = await Entrega.find(query)

        res.send(entregas)
    } catch (error) {
        return res.status(400).send(err)
    }
}

entregasController.listAll = async (req, res) => {
    try {
        const entregas = await Entrega.find({})
        res.status(200).send(entregas)
    } catch (err) {
        return res.status(400).send(err)
    }
}

entregasController.listByActividad = async (req, res) => {
    try {
        const query = req.params.actividad_id
        const entrega = await Entrega.find({ actividad_id: query })
        res.status(200).send(entrega)
    } catch (err) {
        return res.status(400).send(err)
    }
}

entregasController.listByAlumno = async (req, res) => {
    try {
        const query = req.params.alumno_id
        const entrega = await Entrega.find({ alumno_id: query })
        res.status(200).send(entrega)
    } catch (err) {
        return res.status(400).send(err)
    }
}

entregasController.getOne = async (req, res) => {
    try {
        const entrega = await Entrega.findById(req.params.id)
        if (Entrega != null) {
            res.status(200).send(entrega)
        } else {
            res.status(400).send("No hemos encontrado lo que andabas buscando")
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}

entregasController.postEntrega = async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.body.alumno_id)
        const actividad = await Actividad.findById(req.body.actividad_id)

        console.log(req.body)
        if (alumno != null && actividad != null) {
            const entrega = new Entrega({
                alumno_id: req.body.alumno_id,
                actividad_id: req.body.actividad_id
            })
            const savedEntrega = await entrega.save()
            res.status(200).send(savedEntrega._id)
        } else {
            res.status(400).send("El alumno o actividad especificado es erróneo")
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

entregasController.updateEntrega = async (req, res) => {
    const query = req.params.id
    const update = req.body

    const queryValido = isValidObjectId(query)
    const actividadValido = isValidObjectId(update.actividad_id)
    const alumnoValido = isValidObjectId(update.alumno_id)

    if (queryValido && actividadValido && alumnoValido) {
        const alumno = await Alumno.findById(update.alumno_id)
        if (alumno.rol == "alumno") {
            try {
                const updatedEntrega = await Entrega.findByIdAndUpdate(query, update)
                res.status(400).send({ Entrega: updatedEntrega._id })
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

entregasController.deleteEntrega = async (req, res) => {
    try {
        const target = await Entrega.findById(req.params.id)
        if (target) {
            await Entrega.findByIdAndDelete(req.params.id)
            res.status(200).send("Entrega eliminada exitosamente")
        } else {
            return res.status(400).send("No hemos podido encontrar esta entrega")
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports = entregasController