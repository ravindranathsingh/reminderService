const sender = require('../config/email-config')
const TicketRepository = require('../repository/ticket-repo')

const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        const response = await sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }  
}

const fetchPemdingEmail = async () => {
    try {
        const response = await repo.get({status: 'Pending'})
        return response
    } catch (error) {
        console.log(error)
    }
}

const updateTicket = async(ticketId, data) => {
    try {
        const response = await repo.update(ticketId, data)
        return response;
    } catch (error) {
        console.log(error)
    }
}

const createNotification = async (data) => {
    try {
        const response = await repo.create(data)
        return response;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    sendBasicEmail,
    fetchPemdingEmail,
    createNotification,
    updateTicket
}