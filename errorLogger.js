const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const errorLogStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' });

const errorLogger = morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
    stream: errorLogStream,
});

module.exports = { errorLogger, errorLogStream };
