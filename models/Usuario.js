const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    modulos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Modulo" }]
})

module.exports = mongoose.model('Usuario', usuarioSchema)