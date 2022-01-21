const actividadesController = {}

const Actividad = require('../models/Actividad')
const { validacionActividades } = require('../validation')

actividadesController.listAll = async (req, res) => {
    const actividades = await Actividad.find({})
    return res.send(actividades)
}

actividadesController.getOne = async (req, res) => {
    const actividad = await Actividad.findById(req.params.id)
    return res.send(actividad)
}

actividadesController.postActividad = async (req, res) => {
    // Validación de los datos 
    const { error } = validacionActividades(req.body)

    // Si no hay errores en los datos crea una actividad
    if (!error) {

        // TODO: COMPROBAR QUE EL MODULO PROPORCIONADO EXISTE

        const actividad = new Actividad({
            titulo: req.body.titulo,
            modulo_id: req.body.modulo_id,
            descripcion: req.body.descripcion,
            fecha_limite: req.body.fecha_limite
        })

        try {
            const savedActividad = await actividad.save()
            res.send({ actividad: savedActividad._id })
        } catch (err) {     // Si hay un error en la parte del servidor de la DB
            res.status(400).send(err)
        }
    } else {
        return res.status(400).send(error.details[0].message)   // Si hay un error en los datos devuelve el mensaje de error
    }
}

module.exports = actividadesController