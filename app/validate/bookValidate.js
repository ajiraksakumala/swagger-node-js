const Joi = require("joi");

module.exports = {
    validateAddBook, validateDeleteBook
}

function validateAddBook(book) {
  const schema = Joi.object({
    id: Joi.number()
      .required(),
    title: Joi.string()
      .required(),
    author: Joi.string()
      .required(),
    isbn: Joi.string()
      .required(),
    publisherId: Joi.number()
      .required(),
  });
  
  return schema.validate(book);
}

function validateDeleteBook(book) {
  const schema = Joi.object({
    id: Joi.number()
      .required(),
  });

  return schema.validate(book);
}