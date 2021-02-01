const {
    body,
    validationResult
} = require('express-validator');
const {
    failed
} = require("../../config/response")
const {
    books,
    type_books
} = require("../../models")

exports.runBooksValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(failed({
            message: errors.array()[0].msg
        }));
    }
    next();
};

exports.validatorBooks = [
    body("name").notEmpty().withMessage("nama buku tidak boleh kosong").custom(value => {
        return books.findOne({
            where: {
                name: value
            }
        }).then(books => {
            if (books) {
                return Promise.reject("nama buku sudah digunakan");
            }
        });
    })
];

exports.validatorTypeBooks = [
    body("name").notEmpty().withMessage("nama tipe buku tidak boleh kosong").custom(value => {
        return type_books.findOne({
            where: {
                name: value
            }
        }).then(type_books => {
            if (type_books) {
                return Promise.reject("nama tipe buku sudah digunakan");
            }
        });
    })
];