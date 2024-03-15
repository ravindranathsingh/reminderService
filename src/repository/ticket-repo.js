const { NotificationTicket } = require('../models/index')

class TicketReposotory {
    async getAll() {
        try {
            const response = await NotificationTicket.findAll();
            return response;
        } catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const response = await NotificationTicket.create(data)
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TicketReposotory;