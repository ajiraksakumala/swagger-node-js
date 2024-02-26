const response = require("../../config/response");
const db = require("../models");
const Op = db.Sequelize.Op;
const AddBook = require("../request/addBook");
const DeleteBook = require("../request/deleteBook");
const { validateAddBook, validateDeleteBook } = require("../validate/bookValidate");
const books = db.books;
const publishers = db.publishers;

class BookController {
    async _findIdPublisher(publisherId = 0) {
        return await publishers.findByPk(publisherId);
    }

    async _findAllBook(whereCondition = {}) {
        return await books.findAll({
            where: whereCondition
        });
    }

    async _findOneBook(whereCondition = {}, include = '', attributes = '') {
        let param = {
            where: whereCondition,
            include: include,
            attributes: attributes
        };

        if (include == '')
            delete param.include;

        if (attributes == '')
            delete param.attributes;
            
        return await books.findOne(param);
    }

    async _bookCreateorUpdate(columnUpdate = {}, bookId = 0) {
        let result = books.findByPk(bookId, {
            include: [
                {
                    model: publishers,
                    required: true
                }
            ]
        }).then(async (data) => {
            if (data)
                return await data.update(columnUpdate);
            return await books.create(columnUpdate);
        }).then(async (data) => {
            let result = await books.findByPk(data.id, {
                include: [
                    {
                        model: publishers,
                        required: true
                    }
                ]
            });

            return {
                id: result.id,
                title: result.title,
                author: result.author,
                isbn: result.isbn,
                publisher: result.publisher.name,
            };
        });
        
        return result;
    }

    async getAllBook(req, res) {
        try {
            let result = await this._findAllBook();
            return response.ok(result, 'Result all books', res);
        } catch (error) {
            return response.badRequest(null, error.message, res, 500);
        }
    }

    async getBookId(req, res) {
        try {
            const param = {
                id: req.params.id
            };

            const include = [
                {
                    model: publishers,
                    attributes: ['name']
                }
            ]

            const attributes = [
                'id', 'title', 'author', 'isbn'
            ]

            let data = await this._findOneBook(param, include, attributes);

            let result = {};
            if (data) {
                result = {
                    id: data.id,
                    title: data.title,
                    author: data.author,
                    isbn: data.isbn,
                    publisher: data.publisher.name
                }
            }

            return response.ok(result, 'Result book id', res);
        } catch (error) {
            return response.badRequest(null, error.message, res, 500);
        }
    }

    async postBook(req, res) {
        try {
            if (req.route.methods != undefined && req.route.methods.post)
                req.body.id = 0;
                
            const request = new AddBook(
                req.body.id,
                req.body.title,
                req.body.author,
                req.body.isbn,
                req.body.publisherId
            );

            const { error } = await validateAddBook(request);
            if (error)
                throw { message: error.details[0].message };
            
            let paramTitle = {
                title: request.title,
                id: { [Op.ne]: request.id },
            }

            let checkTitle = await this._findOneBook(paramTitle);

            if (checkTitle != null)
                throw { message: 'Nama sudah digunakan oleh buku lain.' };

            let checkPublisher = await this._findIdPublisher(request.publisherId);

            if (!checkPublisher)
                throw { message: 'Publisher tidak terdaftar' };

            let result = await this._bookCreateorUpdate(request, request.id);

            return response.ok(result, 'Successfull add / update Book', res);
        } catch (error) {
            console.log(error)
            return response.badRequest(null, error.message, res, 500);
        }
    }

    async deleteBook(req, res) {
        try {
            const request = new DeleteBook(
                req.params.id
            );

            const { error } = await validateDeleteBook(request);
            if (error)
                throw { message: error.details[0].message };

            let result = await this._findOneBook({ id: request.id }).then(async function (data) {
                if (data) {
                    let deleteBook = await data.destroy({
                        where: request
                    }).then(_ => {
                        return "Book deleted";
                    }).catch(err => {
                        throw { message: err }
                    });

                    return deleteBook;
                } else {
                    throw { message: 'Book not found' }
                }

                return data;
            });
            return response.ok(result, 'Delete book', res);
        } catch (error) {
            return response.badRequest(null, error.message, res, 500);
        }
    }
}

module.exports = BookController;