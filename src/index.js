const express = require('express')
const bodyParser = require('body-parser')

const { PORT } = require('./config/server-config')
const apiRoutes = require('./routes/index')
const db = require('./models/index')
const jobs = require('./utils/job')

const ServerSetUp = async () => {

    const app = express();

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.use('/api', apiRoutes)
    
    app.listen(PORT, async () => {
        console.log(`Server started at Port ${PORT}`)
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true})
        }
        jobs();
    })
}

ServerSetUp();