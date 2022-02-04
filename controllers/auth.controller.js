const authController = {}

const bcryptjs = require('bcryptjs')
const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken')
const { validacionRegistro, validacionLogin } = require('../validation')

authController.postRegister = async (req, res) => {
    // Validación de los datos 
    const { error } = validacionRegistro(req.body)

    // Si no hay errores en los datos crea un usuario
    if (!error) {
        const usuarioExiste = await Usuario.findOne({username: req.body.username})

        if (!usuarioExiste) {
            const salt = await bcryptjs.genSalt(10)
            const hashPassword = await bcryptjs.hash(req.body.password, salt)

            const usuario = new Usuario({
                username: req.body.username,
                password: hashPassword,
                rol: req.body.rol
            })
    
            try {
                const savedUser = await usuario.save()
                res.send({user: savedUser._id})
            } catch (err) {     // Si hay un error en la parte del servidor de la DB
                res.status(400).send(err)
            }
        } else {
            return res.status(400).send("Este usuario ya existe")
        }
        
    } else {
        return res.status(400).send(error.details[0].message)   // Si hay un error en los datos devuelve el mensaje de error
    }
}

authController.postLogin = async (req, res) => {
    // Comprueba los datos del formulario de login
    const { error } = validacionLogin(req.body)

    // Si cumplen los requisitos
    if (!error) {
        const usuario = await Usuario.findOne({username: req.body.username})    // Busca el usuario proporcionado en la DB

        if (usuario) {
            const validPass = await bcryptjs.compare(req.body.password, usuario.password)

            if (validPass) {
                // Creación de token y asignación
                const token = jwt.sign({_id: usuario._id, username: usuario.username, rol: usuario.rol}, process.env.TOKEN_SECRET)
                res.header('auth-token', token).send({token: token})
            } else {
                return res.status(400).send("Contraseña incorrecta")   // En caso de que la contraseña no coincida
            }

        } else {
            return res.status(400).send("Usuario incorrecto")   // En caso de que el usuario no exista
        }
    } else {
        return res.status(400).send(error.details[0].message)
    }
}

module.exports = authController