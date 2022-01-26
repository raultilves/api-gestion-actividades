const mongoose = require('mongoose')

const moduloSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    profesor_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Usuario',
        required: true
    },
    actividades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actividad' }],
    matriculas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Matricula'}]
})

module.exports = mongoose.model('Modulo', moduloSchema)