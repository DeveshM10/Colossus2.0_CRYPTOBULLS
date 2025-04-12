const Joi = require('joi');


const signupValidation = (req,res,next)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        username: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(100).required(),
        password: Joi.string().min(8).max(100).required(),
        mobile: Joi.string().pattern(/^\d{10}$/).required()

    });
    const {error}= schema.validate(req.body);   
    if(error){
        return res.status(400).json({ 
            message: error.details[0].message 
          });
    }
    next();
}
const loginValidation = (req,res,next)=>{
    const schema = Joi.object({
        email: Joi.string().min(8).max(100).required(),
        password: Joi.string().min(8).max(100).required(),
    });
    const {error}= schema.validate(req.body); 
    if(error){
        return res.status(400).json({ 
            message: error.details[0].message 
          });
    }
    next();
}
module.exports = {
    signupValidation,
    loginValidation
}