const { date } = require('joi')
const mongoose = require('mongoose')

const actividadSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    modulo_id: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    fecha_limite: {
        type: Date
    }
})

module.exports = mongoose.model('Actividad', actividadSchema)