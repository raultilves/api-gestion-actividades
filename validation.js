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

// Validación de los datos pasados por formulario de creación de actividad
const validacionActividades = (data) => {
    const schema = Joi.object({
        titulo: Joi.string().required(),
        modulo_id: Joi.string().required(),
        descripcion: Joi.string(),
        fecha_limite: Joi.date()
    })

    return schema.validate(data)
}

// Validación de los datos pasados por formulario de actualizacion de actividad
const validacionActividadesUpdate = (data) => {
    const schema = Joi.object({
        titulo: Joi.string(),
        modulo_id: Joi.string(),
        descripcion: Joi.string(),
        fecha_limite: Joi.date()
    })

    return schema.validate(data)
}

module.exports.validacionRegistro = validacionRegistro
module.exports.validacionLogin = validacionLogin
module.exports.validacionActividades = validacionActividades
module.exports.validacionActividadesUpdate = validacionActividadesUpdate