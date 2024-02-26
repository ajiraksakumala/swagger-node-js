var express = require('express');
const passport = require('passport');
const response = require("../../config/response");
require("../../config/passport")(passport);

const UserController = require('../controller/userController');
const userController = new UserController();
const BookController = require('../controller/bookController');
const bookController = new BookController();
const PublisherController = require('../controller/publisherController');
const publisherController = new PublisherController();

var route = express.Router();

route.post('/login', (req, res) => {
  /* 	
    #swagger.tags = ['my-authentication-controller']
    #swagger.description = 'Login using registered email and password'
    #swagger.summary = 'Login'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/JwtRequest"
                },
            }
        }
    }
    #swagger.responses[200] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelJwtResponse"
      },
      description: "Successfull login will get token, and the token must be included in every request for authorization" 
    }
    #swagger.responses[500] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelJwtResponse"
      },
      description: "Login failed" 
    }
  */
  userController.login(req, res);
});

const validationToken = function (req, res, next) {
  passport.authenticate('jwt', function (err, user, info) {
    if (err) { return response.badRequest(null, err, res, 500) }
    if (!user) { return response.badRequest(null, info.message, res, 401) }
    next();
  })(req, res, next);
};

// Book

route.get('/book', validationToken, (req, res) => {
  /* 	
    #swagger.tags = ['book-controller']
    #swagger.summary = 'List all books'
    #swagger.description = 'Get the list of all books'
    #swagger.security = [{
      "tokenAuth": []
    }] 
    #swagger.responses[200] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelListBookDto"
      },
      description: "OK" 
    }
    #swagger.responses[401] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelErrorToken"
      },
      description: "Invalid token" 
    }
  */
  bookController.getAllBook(req, res);
});

route.put('/book', validationToken, (req, res) => {
  /* 	
    #swagger.tags = ['book-controller']
    #swagger.summary = 'Update book'
    #swagger.description = 'Modify or update the book'
    #swagger.security = [{
      "tokenAuth": []
    }] 
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/Book"
                },
            }
        }
    }
    #swagger.responses[200] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelBookDto"
      },
      description: "OK" 
    }
    #swagger.responses[401] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelErrorToken"
      },
      description: "Invalid token" 
    }
    #swagger.responses[500] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelErrorToken"
      },
      description: "Invalid request" 
    }
  */
  bookController.postBook(req, res);
});

route.post('/book', validationToken, (req, res) => {
  /* 	
    #swagger.tags = ['book-controller']
    #swagger.summary = 'Add new book'
    #swagger.description = 'Adding new book'
    #swagger.security = [{
      "tokenAuth": []
    }] 
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/AddBookRequest"
                },
            }
        }
    }
    #swagger.responses[200] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelBookDto"
      },
      description: "OK" 
    }
    #swagger.responses[401] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelErrorToken"
      },
      description: "Invalid token" 
    }
    #swagger.responses[500] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelErrorToken"
      },
      description: "Invalid request" 
    }
  */
  bookController.postBook(req, res);
});

route.get('/book/:id', validationToken, (req, res) => {
  /* 	
    #swagger.tags = ['book-controller']
    #swagger.summary = 'Get book by id'
    #swagger.description = 'Get book by its identifier (id)'
    #swagger.security = [{
      "tokenAuth": []
    }] 
    #swagger.parameters['id'] = {
        in: 'path',
        required: true,                     
        type: "integer",                          
        format: "int32"
    }
    #swagger.responses[200] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelBookDto"
      },
      description: "OK" 
    }
    #swagger.responses[401] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelErrorToken"
      },
      description: "Invalid token" 
    }
  */
  bookController.getBookId(req, res);
});

route.delete('/book/:id', validationToken, (req, res) => {
  /* 	
    #swagger.tags = ['book-controller']
    #swagger.summary = 'Delete a book'
    #swagger.description = 'Delete a book by id'
    #swagger.security = [{
      "tokenAuth": []
    }] 
    #swagger.parameters['id'] = {
        in: 'path',
        required: true,                     
        type: "integer",                          
        format: "int32"
    }
    #swagger.responses[200] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelBook"
      },
      description: "OK" 
    }
    #swagger.responses[401] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelErrorToken"
      },
      description: "Invalid token" 
    }
  */
  bookController.deleteBook(req, res);
});

// Publisher

route.get('/publisher', validationToken, (req, res) => {
  /* 	
    #swagger.tags = ['publisher-controller']
    #swagger.summary = 'List all publishers'
    #swagger.description = 'Get the list of all publishers'
    #swagger.security = [{
      "tokenAuth": []
    }] 
    #swagger.responses[200] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelIterablePublisher"
      },
      description: "OK" 
    }
    #swagger.responses[401] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelErrorToken"
      },
      description: "Invalid token" 
    }
  */
  publisherController.getAllPublisher(req, res);
});

route.post('/publisher', validationToken, (req, res) => {
  /* 	
    #swagger.tags = ['publisher-controller']
    #swagger.summary = 'Add or edit publisher'
    #swagger.description = 'Add or edit publisher, if id is null then will add new publisher'
    #swagger.security = [{
      "tokenAuth": []
    }] 
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/Publisher"
                },
            }
        }
    }
    #swagger.responses[200] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelPublisher"
      },
      description: "OK" 
    }
    #swagger.responses[401] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelErrorToken"
      },
      description: "Invalid token" 
    }
    #swagger.responses[500] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelErrorToken"
      },
      description: "Invalid request" 
    }
  */
  publisherController.postPublisher(req, res);
});

route.get('/publisher/:id', validationToken, (req, res) => {
  /* 	
    #swagger.tags = ['publisher-controller']
    #swagger.summary = 'Get publisher by id'
    #swagger.description = 'Get publisher by its identifier (id)'
    #swagger.security = [{
      "tokenAuth": []
    }] 
    #swagger.parameters['id'] = {
        in: 'path',
        required: true,                     
        type: "integer",                          
        format: "int32"
    }
    #swagger.responses[200] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelPublisher"
      },
      description: "OK" 
    }
    #swagger.responses[401] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelErrorToken"
      },
      description: "Invalid token" 
    }
  */
  publisherController.getPublisherId(req, res);
});

route.delete('/publisher/:id', validationToken, (req, res) => {
  /* 	
    #swagger.tags = ['publisher-controller']
    #swagger.summary = 'Delete a publisher'
    #swagger.description = 'Delete a publisher by id'
    #swagger.security = [{
      "tokenAuth": []
    }] 
    #swagger.parameters['id'] = {
        in: 'path',
        required: true,                     
        type: "integer",                          
        format: "int32"
    }
    #swagger.responses[200] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelPublisher"
      },
      description: "OK" 
    }
    #swagger.responses[401] = {
      schema: { 
        "$ref": "#/definitions/HttpResponseModelErrorToken"
      },
      description: "Invalid token" 
    }
  */
  publisherController.deletePublisher(req, res);
});

module.exports = route;
