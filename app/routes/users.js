var express = require('express');
var route = express.Router();

const UserController = require('../controller/userController');
const userController = new UserController();

route.post('/register', (req, res) => {
/* 	
  #swagger.tags = ['user-controller']
  #swagger.description = 'Registering for new user'
  #swagger.summary = 'Register new user'
  #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  $ref: "#/definitions/RegistrationRequest"
              }  
          }
      }
  }
  #swagger.responses[200] = {
    schema: { 
      "$ref": "#/definitions/HttpResponseModelUserDto"
    },
    description: "Successfull registration" 
  }
  #swagger.responses[500] = {
    schema: { 
      "$ref": "#/definitions/HttpResponseModelUserDto"
    },
    description: "Status code 500 in the response means registration failed" 
  }
*/
  userController.register(req, res);
});

module.exports = route;
