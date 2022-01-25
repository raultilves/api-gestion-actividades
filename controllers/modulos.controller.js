const modulosController = {}

const Modulo = require('../models/Modulo')

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
        res.status(200).send(modulo)
    } catch (err) {
        return res.status(400).send(err)
    }
}

modulosController.postModulo = async (req, res) => {
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
}

modulosController.updateModulo = async (req, res) => {
    const query = req.params.id
    const update = req.body

    try {
        const updatedModulo = await Modulo.findByIdAndUpdate(query, update)
        res.status(200).send({ modulo: updatedModulo._id })
    } catch (err) {
        return res.status(400).send(err)   // Si hay error en el lado de la DB
    }
}

modulosController.deleteModulo = async (req, res) => {
    const target = await Modulo.findById(req.params.id)
    // Comprueba que el modulo especificado exista
    if (target) {
        try {
            await Modulo.findByIdAndDelete(req.params.id)
            res.status(200).send('¡Módulo eliminado existosamente!')
        } catch (err) {
            return res.status(400).send(err)
        }
    } else {
        // Si hay un error en los datos devuelve el mensaje de error
        return res.status(400).send("Oops... No hemos sido capaces de encontrar esa actividad, por favor, inténtalo de nuevo :)")
    }
}

module.exports = modulosController