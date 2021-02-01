const {
    success,
    failed
} = require("../../config/response");
const {
    users,
    orders,
    books
} = require("../../models");

exports.get = async (req, res) => {
    try {
        const data = await users.findAll({
            include: {
                model: orders,
                include: {
                    model: books,
                }
            }
        });
        return res.json(success({
            message: "data berhasil diterima",
            data
        }));
    } catch (error) {
        return res.json(failed({
            message: "terjadi kesalahan sistem",
            data: error
        }));
    }
};


/* MASIH GAPAHAM SAYA MAS */
exports.bulkCreate = async (req, res) => {
    const payload = [{
            users_id: req.body.users_id,
            books_id: req.body.books_id,
            qty: req.body.qty
        },
        {
            users_id: req.body.users_id,
            books_id: req.body.books_id,
            qty: req.body.qty
        }
    ];

    try {
        const data = await orders.bulkCreate(payload);
        return res.json(success({
            message: "data berhasil ditambahkan",
            data
        }));
    } catch (error) {
        return res.json(failed({
            message: "terjadi kesalahan sistem",
            data: error
        }));
    };
};