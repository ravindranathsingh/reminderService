const express = require('express')
const bodyParser = require('body-parser')

const { PORT } = require('./config/server-config')
const apiRoutes = require('./routes/index')
const db = require('./models/index')
const jobs = require('./utils/job')

const { createChannel, subscribeMessage } = require('./utils/messageQueue')
const { REMINDER_BINDING_KEY } = require('./config/server-config')

const EmailService = require('./service/email-service')

const ServerSetUp = async () => {

    const app = express();

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.use('/api', apiRoutes)

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscriveEvent, REMINDER_BINDING_KEY)
    
    app.listen(PORT, async () => {
        console.log(`Server started at Port ${PORT}`)
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true})
        }
        jobs();
    })
}

ServerSetUp();