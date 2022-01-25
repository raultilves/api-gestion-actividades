const mongoose = require('mongoose')

const actividadSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    modulo_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Modulo',
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