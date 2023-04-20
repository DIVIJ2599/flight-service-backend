const { StatusCodes } = require("http-status-codes");
const { createBooking } = require("../services/bookingService");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const create = async(req,res) => {
    try{
        const response = await createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            message: 'Booking Completed',
            success: true,
            data: response,
            error: {}
        })
    }catch(err){
        console.log(err);
        return res.status(err.StatusCodes).json({
            message: err.message,
            success: false,
            data: {},
            error: err.explanation
        })
    }
}

const sendMessageToQueue = async (req,res) => {
    const channel = await createChannel();
    const payload = {
        data:{
            subject:'This is a notification from queue',
            content:'Some queue will subscribe',
            recepientEmail:'divijsehgal2599@gmail.com',
            NotificationTime:'2023-01-01 09:59:00'
        },
        service:'CREATE_TICKET'
    }
    publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
    return res.status(200).json({
        message:"message published successfully"
    })
}

module.exports = {
    create,
    sendMessageToQueue
}