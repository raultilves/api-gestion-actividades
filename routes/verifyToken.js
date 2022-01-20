const jwt = require('jsonwebtoken')

module.exports = function auth (req, res, next) {
    const token = req.header('auth-token')
    if (token) {
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified
            next()
        } catch (error) {
            return res.status(400).send('Token inválido')
        }
    } else {
        return res.status(401).send('Acceso denegado')
    }
}