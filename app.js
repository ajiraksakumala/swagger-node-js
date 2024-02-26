const { app } = require("./require");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

var indexRouter = require('./app/routes/index');
var usersRouter = require('./app/routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

require("./handle-error");

module.exports = app;