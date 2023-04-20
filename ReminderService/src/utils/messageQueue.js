const amqplib = require('amqplib');
const {MESSAGE_BROKER_URL,EXCHANGE_NAME} = require('../config/serverConfig')

const createChannel = async () => {
    try{
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME,'direct',false);
        return channel;
    }catch(err){
        console.log(err);
        throw err;
    }
}

const subscribeMessage = async (channel, service, binding_key) => {
    const appQueue = await channel.assertQueue("QUEUE_NAME")

    channel.bindQueue(appQueue.queue,EXCHANGE_NAME,binding_key);

    channel.consume(appQueue.queue,msg =>{
        console.log('Recieved data')
        console.log(msg.content.toString())
        const payload = JSON.parse(msg.content.toString())
        service(payload)
        channel.ack(msg)
    });
}

const publishMessage = async (channel, binding_key, message) => {
    try{
        await channel.assertQueue('QUEUE_NAME')
        await channel.publish(EXCHANGE_NAME, binding_key,Buffer.from(message));
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

module.exports = {
    subscribeMessage,
    createChannel,
    publishMessage
}