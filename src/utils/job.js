const cron = require('node-cron')
const emailService = require('../service/email-service');
const sender = require('../config/email-config');

const setUpJobs = () => {
    cron.schedule('*/5 * * * *', async () => {
        const response = await emailService.fetchPemdingEmail();
        response.forEach((email) => {
            sender.sendMail({
                from: "reminderservice@airline.com",
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, async (err, data) => {
                if(err) {
                    console.log(err)
                }else {
                    console.log(data);
                    await emailService.updateTicket(email.id, {status: 'Success'})
                }
            })
        })
        console.log(response)
    })
}

module.exports = setUpJobs;