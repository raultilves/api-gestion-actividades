const actividadesController = {}

const Actividad = require('../models/Actividad')
const { validacionActividades, validacionActividadesUpdate } = require('../validation')

actividadesController.listAll = async (req, res) => {
    try {
        const actividades = await Actividad.find({})
        return res.status(200).send(actividades)
    } catch (err) {
        return res.status(400).send(err)
    }
}

actividadesController.getOne = async (req, res) => {
    const actividad = await Actividad.findById(req.params.id)
    return res.status(201).send(actividad)
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
            res.status(202).send({ actividad: savedActividad._id })
        } catch (err) {     // Si hay un error en la parte del servidor de la DB
            res.status(400).send(err)
        }
    } else {
        return res.status(400).send(error.details[0].message)   // Si hay un error en los datos devuelve el mensaje de error
    }
}

actividadesController.updateActividad = async (req, res) => {
    // Validación de los datos 
    const { error } = validacionActividadesUpdate(req.body)

    // Si no hay errores en los datos actualiza una actividad
    if (!error) {
        const query = req.params.id
        const update = req.body

        try {
            const updatedActividad = await Actividad.findByIdAndUpdate(query, update)
            return res.status(203).send({ actividad: updatedActividad._id })
        } catch (err) {
            return res.status(400).send(err)   // Si hay error en el lado de la DB
        }
    } else {
        return res.status(400).send(error.details[0].message)   // Si hay un error en los datos devuelve el mensaje de error
    }
}

actividadesController.deleteActividad = async (req, res) => {
    const target = await Actividad.findById(req.params.id)
    // Comprueba que la actividad especificada exista
    if (target) {
        try {
            await Actividad.findByIdAndDelete(req.params.id)
            return res.status(204).send("¡Actividad eliminada existosamente!")
        } catch (err) {
            return res.status(400).send(err)    // Si hay error en el lado de la DB
        }
        
    } else {
        return res.status(400).send("Oops... No hemos sido capaces de encontrar esa actividad, por favor, inténtalo de nuevo :)")  // Si hay un error en los datos devuelve el mensaje de error
    }
    
}

module.exports = actividadesController