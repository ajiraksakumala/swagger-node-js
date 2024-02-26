const { errorLogStream } = require("../errorLogger");

async function ok(values, message, reply) {
    return reply
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            // code: 200,
            status: 1,
            message: message,
            data: values,
        });
}

async function badRequest(values, message, reply, code) {
    if (code == '' || code == undefined) {
        code = 500
    };

    errorLogStream.write(`${new Date().toISOString()} - Error: ${message}\n`);

    if (typeof message == 'string') {
        message = message.split('Err : ').join('');
        message = message.split('Err :').join('');
        message = message.split('Err: ').join('');
        message = message.split('Err:').join('');
        message = message.split('err : ').join('');
        message = message.split('err :').join('');
        message = message.split('err: ').join('');
        message = message.split('err:').join('');
        message = message.split('Error:').join('');
    } else {
        let tmp_values = '';
        if (values) {
            tmp_values = values;
        }
        values = message;
        message = tmp_values;
    }

    return reply
        .status(code)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            // code: code,
            status: 0,
            message: message,
            data: values,
        });
}

module.exports = {
    ok, badRequest
};
