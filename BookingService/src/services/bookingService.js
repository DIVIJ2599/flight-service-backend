const axios = require('axios');
const {StatusCodes} = require('http-status-codes');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const { Booking } = require("../models/index");
const { AppError, ServiceError } = require("../utils/Errors");
const ValidationError = require("../utils/Errors/validation-error");


const createBooking = async (data) => {
    try{
        const flightId = data.flightId;
        let getFlightURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
        const flight = await axios.get(getFlightURL)
        const flightData = flight.data.data;
        let flightPrice = flightData.price;
        if(data.noOfSeats > flightData.noOfSeats){
            throw new ServiceError('Something went wrong','Insuficcient seats')
        }
        const totalPrice = flightPrice * data.noOfSeats;
        console.log(totalPrice);
        const bookingPayload = {...data,totalCost:totalPrice};
        console.log(bookingPayload)
        const booking = await Booking.create(bookingPayload);
        const flightUpdateURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
        await axios.patch(flightUpdateURL,{totalSeats: flightData.totalSeats - booking.noOfSeats});
        const finalBooking = await Booking.update(booking.id,{ status:"Booked" });
        return finalBooking;
    }catch(err){
        if(err.name === 'SequelizeValidationError'){
            throw new ServiceError(err)
        }else{
            throw new AppError('Service Error','Cannot create booking','There was some issue in creating the booking, please try again later',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

const updateBooking = async (data,bookingId) => {
    try{
        const booking = await Booking.findByPk(bookingId);
        
    }catch(err){
        if(err.name === 'SequelizeValidationError'){
            throw new ServiceError(err)
        }else{
            throw new AppError('Service Error','Cannot update booking','There was some issue in updating the booking, please try again later',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

const deleteBooking = async (bookingId) => {
    
}

module.exports = {
    createBooking,
    updateBooking,
    deleteBooking
}