const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//Importaciones de rutas
const authRoute = require('./routes/auth')
const actividadesRoute = require('./routes/actividades')
const modulosRoute = require('./routes/modulos')
const matriculasRoute = require('./routes/matriculas')
const entregasRoute = require('./routes/entregas')

dotenv.config()

// Conexión con la DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB')
)

// Middlewares
app.use(express.json())

// Middlewares de rutas
app.use('/api/user', authRoute)
app.use('/api/actividades', actividadesRoute)
app.use('/api/modulos', modulosRoute)
app.use('/api/matriculas', matriculasRoute)
app.use('/api/entregas', entregasRoute)

app.listen(3000, () => console.log("Server running"))