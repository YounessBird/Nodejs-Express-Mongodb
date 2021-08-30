const Joi = require("joi");

const RegistrValidate = (data) => {
  const schema = {
    title: Joi.string().min(2).required(),
    description: Joi.string().min(19).required(),
  };
  return Joi.validate(data, schema);
};
const loginValidate = (data) => {
  const schema = {
    title: Joi.string().min(2).required(),
    description: Joi.string().min(19).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.RegistrValidate = RegistrValidate;
module.exports.loginValidate = loginValidate;
