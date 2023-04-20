const express = require('express');
const { create,sendMessageToQueue } = require('../controllers/bookingController');
const { createChannel } = require('../utils/messageQueue');

const router = express.Router();

router.post("/bookings",create);
router.post("/publish",sendMessageToQueue)

module.exports = router;