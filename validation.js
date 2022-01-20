const Joi = require('joi')

// Validacion de registro de usuario
const validacionRegistro = (data) => {
    const schema =  Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        rol: Joi.string().required(),
    })

    return schema.validate(data)    
}

// Validacion de login
const validacionLogin = (data) => {
    const schema =  Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })

    return schema.validate(data)
}

module.exports.validacionRegistro = validacionRegistro
module.exports.validacionLogin = validacionLogin