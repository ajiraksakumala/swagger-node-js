const response = require("../../config/response");
const db = require("../models");
const Op = db.Sequelize.Op;
const AddPublisher = require("../request/addPublisher");
const DeletePublisher = require("../request/deletePublisher");
const { validateAddPublisher, validateDeletePublisher } = require("../validate/publisherValidate");
const publishers = db.publishers;

class PublisherController {
    async _findAllPublisher(whereCondition = {}) {
        return await publishers.findAll({
            where: whereCondition,
            attributes: ['id', 'name']
        });
    }

    async _findOnePublisher(whereCondition = {}) {
        return await publishers.findOne({
            where: whereCondition,
            attributes: ['id', 'name']
        });
    }

    async _publisherCreateorUpdate(columnUpdate = {}, publisherId = 0) {
        let result = await publishers.findByPk(publisherId)
            .then(async function (data) {
                if (data)
                    return await data.update(columnUpdate);
                return await publishers.create(columnUpdate);
            }).then(async (data) => {
                console.log(data);

                let result = await publishers.findByPk(data.id, { attributes: ['id', 'name'] })

                return {
                    id: result.id,
                    name: result.name
                };
            });
        
        return result
    }

    async getAllPublisher(req, res) {
        try {
            let result = await this._findAllPublisher();
            return response.ok(result, 'Result all publishers', res);
        } catch (error) {
            return response.badRequest(null, error.message, res, 500);
        }
    }

    async getPublisherId(req, res) {
        try {
            const param = {
                id: req.params.id
            };

            let result = await this._findOnePublisher(param);
            return response.ok(result, 'Result publisher id', res);
        } catch (error) {
            return response.badRequest(null, error.message, res, 500);
        }
    }

    async postPublisher(req, res) {
        try {
            const request = new AddPublisher(
                req.body.id,
                req.body.name
            );

            const { error } = await validateAddPublisher(request);
            if (error)
                throw { message: error.details[0].message };
            
            let paramName = {
                name: request.name,
                id: { [Op.ne]: request.id },
            }

            let checkName = await this._findOnePublisher(paramName);

            if (checkName != null)
                throw { message: 'Nama sudah digunakan oleh publisher lain.' };

            let result = await this._publisherCreateorUpdate(request, request.id);

            return response.ok(result, 'Successfull add / update Publisher', res);
        } catch (error) {
            return response.badRequest(null, error.message, res, 500);
        }
    }

    async deletePublisher(req, res) {
        try {
            const request = new DeletePublisher(
                req.params.id
            );

            const { error } = await validateDeletePublisher(request);
            if (error)
                throw { message: error.details[0].message };

            let result = await this._findOnePublisher({ id: request.id }).then(async function (data) {
                if (data) {
                    let deletePublisher = await data.destroy({
                        where: request
                    }).then(_ => {
                        return "Publisher deleted";
                    }).catch(err => {
                        throw { message: err }
                    });

                    return deletePublisher;
                } else {
                    throw { message: 'Publisher not found' }
                }

                return data;
            });
            return response.ok(result, 'Delete publisher', res);
        } catch (error) {
            return response.badRequest(null, error.message, res, 500);
        }
    }
}

module.exports = PublisherController;