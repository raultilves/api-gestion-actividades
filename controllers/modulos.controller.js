const modulosController = {}

const { isValidObjectId } = require('mongoose')
const Modulo = require('../models/Modulo')
const Usuario = require('../models/Usuario')
const Profesor = require('../models/Usuario')

modulosController.listAll = async (req, res) => {
    try {
        const modulo = await Modulo.find({})
        res.status(200).send(modulo)
    } catch (err) {
        return res.status(400).send(err)
    }
}

modulosController.getOne = async (req, res) => {
    try {
        const modulo = await Modulo.findById(req.params.id)
        if (modulo != null) {
            res.status(200).send(modulo)
        } else {
            res.status(400).send("El módulo solicitado no existe")
        }

    } catch (err) {
        return res.status(400).send(err)
    }
}

modulosController.postModulo = async (req, res) => {
    const profesor = await Usuario.findById(req.body.profesor_id)

    if (profesor != null && profesor.rol == "profesor") {
        const modulo = new Modulo({
            nombre: req.body.nombre,
            profesor_id: req.body.profesor_id
        })

        try {
            const savedModulo = await modulo.save()
            res.status(200).send(savedModulo._id)

        } catch (err) {
            res.status(400).send(err)
        }
    } else {
        res.status(400).send("El usuario no existe o no es profesor")
    }
}

modulosController.updateModulo = async (req, res) => {
    const query = req.params.id
    const update = req.body
    if (isValidObjectId(query)) {
        const profesor = await Usuario.findById(update.profesor_id)

        if (profesor != null && profesor.rol == "profesor") {
            try {
                const updatedModulo = await Modulo.findByIdAndUpdate(query, update)
                res.status(200).send({ modulo: updatedModulo._id })
            } catch (err) {
                return res.status(400).send(err)   // Si hay error en el lado de la DB
            }
        } else {
            res.status(400).send("El profesor especificado no existe o no es profesor")
        }

    } else {
        res.status(400).send("El modulo solicitado no existe")
    }

}

modulosController.deleteModulo = async (req, res) => {
    try {
        const target = await Modulo.findById(req.params.id)
        if (target) {
            await Modulo.findByIdAndDelete(req.params.id)
            res.status(200).send('¡Módulo eliminado existosamente!')
        } else {
            // Si hay un error en los datos devuelve el mensaje de error
            return res.status(400).send("Oops... No hemos sido capaces de encontrar esa actividad, por favor, inténtalo de nuevo :)")
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports = modulosController