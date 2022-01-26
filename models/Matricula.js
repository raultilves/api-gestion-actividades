const mongoose = require('mongoose')

const matriculaSchema = new mongoose.Schema({
    modulo_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Modulo',
        required: true
    },
    alumno_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Alumno',
        required: true
    }
})

module.exports = mongoose.model('Matricula', matriculaSchema)