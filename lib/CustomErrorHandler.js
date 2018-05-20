
const autoBind = require('auto-bind');





class CustomErrorHandler {

    constructor() {
        autoBind(this);
    }

    errorMessage(res,status_code,fieldName) {

    }
    maxLength() {
        
    }
    notEmpty(res ,body) {
        if(body.trim().length === 0) {
            return res.status(422).json({message:`This field is required`})
        }
    }
    minLength() {
        
    }
    match() {

    }
    checkField() {

    }

}


module.exports = CustomErrorHandler;