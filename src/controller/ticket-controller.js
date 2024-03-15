const TicketService = require('../service/email-service')

const create = async ( req, res ) => {
    try {
        const response = await TicketService.createNotification(req.body)
        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully registered email reminder',
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to register email reminder',
            err: error
        })
    }
}

module.exports = {
    create
}