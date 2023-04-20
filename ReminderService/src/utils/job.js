const cron = require('node-cron');
const { fetchPendingEmails, sendBasicEmail, updateTiket } = require('../services/emailService');
const sender = require('../config/emailConfig');

const setupJobs = () => cron.schedule('*/1 * * * *',async()=>{
    const res = await fetchPendingEmails();
    res.forEach((email)=>{
       sender.sendMail({
        from:"reminder@airline.com",
        to:email.recepientEmail,
        subject:email.subject,
        text:email.content
       },async(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
            await updateTiket(email.id, {status:"SUCCESS"})
        }
       })
    })
})

module.exports = setupJobs;