const {
    body,
    validationResult
} = require('express-validator');
const {
    failed
} = require("../../config/response")
const {
    users
} = require("../../models")

exports.runUsersValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(failed({
            message: errors.array()[0].msg
        }));
    }
    next();
};

exports.validatorUsers = [
    body("name", "name tidak boleh kosong").notEmpty(),
    body("address", "address tidak boleh kosong").notEmpty(),
    body("phone").notEmpty().withMessage("phone tidak boleh kosong").custom(value => {
        return users.findOne({
            where: {
                phone: value
            }
        }).then(users => {
            if (users) {
                return Promise.reject("phone sudah digunakan");
            }
        });
    }),
    body("gender", "format gender tidak sesuai").isIn("M", "F")
];