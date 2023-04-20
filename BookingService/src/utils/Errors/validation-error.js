const {StatusCodes} = require('http-status-codes');

class ValidationError extends Error{
    constructor(error){
        super();
        this.name = "Validation Error";
        this.message = "Unable to Validate data";
        this.statusCode = StatusCodes.BAD_REQUEST;
        let explanation = [];
        error.forEach((arr)=>{
            this.explanation.push(err.message)
        })
        this.explanation = explanation;
    }
}

module.exports = ValidationError;