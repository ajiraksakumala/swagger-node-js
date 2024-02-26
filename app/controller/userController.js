const response = require("../../config/response");
const jwt = require('jsonwebtoken');
const db = require("../models");
const UserRegister = require("../request/userRegister");
const UserLogin = require("../request/userLogin");
const user = db.users;
const { validateUserRegister, validateUserLogin } = require("../validate/userValidate");

class UserController {
    async _findOneUser(whereCondition = {}) {
        return await user.findOne({
            where: whereCondition
        });
    }

    async register(req, res) {
        try {
            const request = new UserRegister(
                req.body.firstName,
                req.body.lastName,
                req.body.password,
                req.body.email
            );

            const { error } = await validateUserRegister(request);
            if (error)
                throw { message: error.details[0].message };

            let param = {
                email: request.email
            };

            const userFound = await this._findOneUser(param);

            if (userFound)
                throw { message: "User already registered" };

            let users = await user.build(request);

            users = await users.save();

            request.token = users.generateAuthToken();

            let result = {
                email: users.email,
                firstName: users.firstName,
                lastName: users.lastName,
            }

            return response.ok(result, 'Successfull registration', res);
        } catch (error) {
            return response.badRequest(null, error.message, res, 500);
        }
    }

    async login(req, res) {
        try {
            const request = new UserLogin(
                req.body.email,
                req.body.password
            );

            const { error } = await validateUserLogin(request);
            if (error)
                throw { message: error.details[0].message };

            let param = {
                email: request.email
            };
            
            let userFound = await this._findOneUser(param)
                .then((user) => {
                    if (!user)
                        return response.badRequest(null, 'Authentication failed. User not found.', res, 500);

                    user.comparePassword(request.password, (err, isMatch) => {
                        if (isMatch && !err) {
                            var token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.jwtPrivateKey, {
                                expiresIn: 86400 * 30
                            });

                            jwt.verify(token, process.env.jwtPrivateKey, function (err, data) {
                                if (err)
                                    console.log(err, data);
                            });

                            let result = {
                                token: token
                            };

                            return response.ok(result, 'Successfull login', res);
                        } else {
                            return response.badRequest(null, 'Authentication failed. Wrong password.', res, 500);
                        }
                    })
                })
                .catch((error) => {
                    return response.badRequest(null, error, res, 500);
                });
        } catch (error) {
            return response.badRequest(null, error.message, res, 500);
        }
    }
}

module.exports = UserController;
