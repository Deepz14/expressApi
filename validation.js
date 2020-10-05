const Joi = require('@hapi/joi');

 const RegisterValidation = (data) => {
    const Schema = Joi.object({
      Name: Joi.string().min(4).max(20).strict().trim().required(),
      Email: Joi.string().min(6).email().required(),
      Password: Joi.string().min(6).max(15).strict().trim().required(),
    });
    return Schema.validate(data);
 }

 
 const LoginValidation = (data) => {
   const Schema = Joi.object({
     Email: Joi.string().min(6).email().required(),
     Password: Joi.string().min(6).max(15).strict().trim().required(),
   });
   return Schema.validate(data);
 };

 module.exports.RegisterValidation = RegisterValidation;
 module.exports.LoginValidation = LoginValidation;

 