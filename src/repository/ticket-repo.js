const { Op } = require('sequelize');
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
    async get(filter) {
        try {
            const tickets = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date()
                    }
                }
            })
            return tickets;
        } catch (error) {
            throw error;
        }
    }
    async update(ticketId, data) {
        try {
            const tickets = await NotificationTicket.findByPk(ticketId)
            if(data.status) {
                ticketId.status = data.status;
            }
            await tickets.save();
            return tickets;
        } catch (error) {
            throw error
        }
    }
}

module.exports = TicketReposotory;