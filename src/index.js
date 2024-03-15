const express = require('express')
const bodyParser = require('body-parser')
const cron = require('node-cron')

const db = require('./models/index')

const { PORT } = require('./config/server-config')
const apiRoutes = require('./routes/index')
// const { sendBasicEmail } = require('./service/email-service')

const ServerSetUp = () => {

    const app = express();

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.use('/api', apiRoutes)
    
    app.listen(PORT, async () => {
        console.log(`Server started at Port ${PORT}`)
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true})
        }
        // sendBasicEmail(
        //     'support@admin.com',
        //     'rs9515806@gmail.com',
        //     'This is a test email',
        //     'Hey, I hope you liked the support that has been provided'
        // )
        cron.schedule('*/2 * * * *', () => {
            console.log('running a task every two minute');
        })
    })
}

ServerSetUp();