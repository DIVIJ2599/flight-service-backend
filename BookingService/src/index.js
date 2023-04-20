const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {PORT,FLIGHT_SERVICE_PATH} = require('./config/serverConfig')
const apiRoutes = require('./routes/index');
const db = require("./models/index");

const startServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.get('/bookingService/api/v1/home',(req,res)=>{
        return res.json({message:"Hititng the booking service"})
    })
    app.use("/bookingService/api",apiRoutes);

    app.listen(PORT,()=>{
        console.log(`Server Started on Port ${PORT}`)
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true})
        }
    })
}

startServer();