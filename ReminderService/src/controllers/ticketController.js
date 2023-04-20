const { createNotification } = require("../services/emailService");

const create = async (req,res)=>{
    try{
        const response = await createNotification(req.body);
        return res.status(201).json({
            success: true,
            data: response,
            err: {},
            message: "Notification created successfully"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            data: {},
            err,
            message: "Notification cannot be created"
        })
    }
}

module.exports = {
    create
}