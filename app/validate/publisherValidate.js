const Joi = require("joi");

module.exports = {
    validateAddPublisher, validateDeletePublisher
}

function validateAddPublisher(publisher) {
  const schema = Joi.object({
    id: Joi.number()
      .required(),
    name: Joi.string()
      .required(),
  });

  return schema.validate(publisher);
}

function validateDeletePublisher(publisher) {
  const schema = Joi.object({
    id: Joi.number()
      .required(),
  });

  return schema.validate(publisher);
}