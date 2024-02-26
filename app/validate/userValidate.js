const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");

module.exports = {
    validateUserRegister, validateUserLogin
}

function validateUserRegister(user) {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(100)
      .required(),
    lastName: Joi.string()
      .min(2)
      .max(100)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: PasswordComplexity()
  });

  return schema.validate(user);
}

function validateUserLogin(user) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),
  });

  return schema.validate(user);
}