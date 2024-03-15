const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const db = require('./models/index')

const { PORT } = require('./config/server-config')
const apiRoutes = require('./routes/index')

const ServerSetUp = () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.use('/api', apiRoutes)
    
    app.listen(PORT, async () => {
        console.log(`Server started at Port ${PORT}`)
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true})
        }
    })
}

ServerSetUp();