const errorhander = require("../utils/errorhander")

module.exports = ( err  , req  , res, next )  =>{

    err.statuscode = err.statuscode || 500;

    err.message = err.message || " Internal serve error"


    if (err.name === "CastError") {
        err = new errorhander(`Resourse not found : invalid ${err.path}` , 400)


    }
    
    //  mongoose duplicate key serror
    if (err.code === 1100) {
        err = new errorhander(`Duplicate ${Object.keys(err.keyValue)} Enterd` , 400)
    }
    res.status(err.statuscode).json({
        Success : false,
        // err : err.stack,
        message : err.message,
    })
}