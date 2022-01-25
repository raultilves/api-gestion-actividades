const modulosController = {}

const Modulo = require('../models/Modulo')

modulosController.listAll = async (req, res) => {
    try {
        const modulo = await Modulo.find({})
        return res.status(200).send(modulo)
    } catch (err) {
        return res.status(400).send(err)
    }
}

modulosController.getOne = async (req, res) => {
    try {
        const modulo = await Modulo.findById(req.params.id)
        return res.status(201).send(modulo)
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
        res.status(202).send(savedModulo._id)
        
    } catch (err) {
        res.status(400).send(err)
    }
}

modulosController.updateModulo = async (req, res) => {

}

modulosController.deleteModulo = async (req, res) => {

}

module.exports = modulosController