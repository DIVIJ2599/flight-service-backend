const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const { create } = require('./controllers/ticketController')
const setupJobs = require('./utils/job');
const { createChannel } = require('./utils/messageQueue');

const setupServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))

    const channel = await createChannel();

    app.post("/api/v1/tickets",create);

    app.listen(PORT,()=>{
        console.log(`Server Started at Port ${PORT}`)
    })

    // setupJobs(); 
}

setupServer();
