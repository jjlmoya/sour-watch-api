const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const cors = require('cors')
const { sequelize } = require('./models')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use(cors()) // TODO: revisar seguridad

require('./routes')(app)

const PORT = 3027

app.listen(PORT, () => {
    console.info(`Server up: http://localhost:${PORT}`)
    // sequelize.sync({ force: true })
    sequelize.authenticate().then(() => {
        console.info('Connection established with the database')
    })
})

module.exports = app
