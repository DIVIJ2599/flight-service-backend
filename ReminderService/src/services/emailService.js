const sender = require('../config/emailConfig');
const {NotificationTicket} = require('../models/index');
const { Op } = require('sequelize');

const sendBasicEmail = async (from,to,subject,mailBody) => {
    try{
        const response = await sender.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: mailBody
    })
    console.log(response)
    }
    catch(error){
        console.log(error);
    }
}

const fetchPendingEmails = async(timestamp) => {
    try{
        const res = await NotificationTicket.findAll({
            where: {
                status: "PENDING",
                notificationTime: {
                    [Op.lte]: new Date()
                }
            }
        });
        return res;
    }catch(error){
        console.log(error);
    }
}

const createNotification = async(data) => {
    try{
        const res = await NotificationTicket.create(data);
        return res;
    }catch(err){
        console.log(err);
    }
}

const updateTiket = async(ticketId,data)=>{
    try{
        const ticket = await NotificationTicket.findByPk(ticketId);
        if(data.status){
        ticket.status = data.status
        }
        await ticket.save();
        return ticket;
    }catch(err){
        console.log(err);
    }
}

const subscribeEvents = async (payload) => {
    let {data,service} = payload;
    switch(service){
        case 'CREATE_TICKET':
            await createNotification(data)
            break;
        case 'SEND_BASIC_MAIL':
            await sendBasicEmail(data)
            break;
        default: 
            console.log('No Valid Email')
            break;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTiket,
    subscribeEvents
};