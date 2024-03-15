const cron = require('node-cron')
const emailService = require('../service/email-service')

const setUpJobs = () => {
    cron.schedule('*/5 * * * *', async () => {
        const response = await emailService.fetchPemdingEmail();
        console.log(response)
    })
}

module.exports = setUpJobs;