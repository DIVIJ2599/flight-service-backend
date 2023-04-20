const express = require('express');
const { PORT } = require('./config/serverConfig');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(morgan('combined'))
app.use('/bookingService',createProxyMiddleware({ target:'http://localhost:3002', changeOrigin:true }))
app.get('/home',(req,res)=>{
    return res.json({
        message:'OK'
    })
})

app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`)
})