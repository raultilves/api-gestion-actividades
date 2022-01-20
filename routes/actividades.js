const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
    res.json({actividades: [
        {
            titulo: "A1",
            descripcion: "Prueba 1"
        },
        {
            titulo: "A2",
            descripcion: "Prueba 2"
        },
        {
            titulo: "A3",
            descripcion: "Prueba 3"
        }
    ]})
})

module.exports = router