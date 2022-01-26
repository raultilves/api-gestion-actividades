const mongoose = require('mongoose')

const entregaSchema = new mongoose.Schema({
    actividad_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Actividad',
        required: true
    },
    alumno_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Alumno',
        required: true
    }
})

module.exports = mongoose.model('Entrega', entregaSchema)