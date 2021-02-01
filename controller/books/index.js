const {
    success,
    failed
} = require("../../config/response");
const {
    books,
    type_books
} = require("../../models");

exports.get = async (req, res) => {
    try {
        const data = await books.findAll();
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

exports.create = async (req, res) => {
    const payload = {
        name: req.body.name,
        type_book: {
            name: req.body.type
        }
    };
    try {
        const data = await books.create(payload, {
            include: [type_books]
        });
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

exports.update = async (req, res) => {
    const payload = {
        name: req.body.name,
        type: req.body.type
    };
    const where = {
        id: req.body.id
    };
    try {
        const data = await books.update(payload, {
            where
        }, {
            include: [type_books]
        });
        if (data[0])
            return res.json(success({
                message: "data berhasil diperbarui",
                data: req.body
            }));
        else throw "data tidak tersedia";
    } catch (error) {
        return res.json(failed({
            message: "terjadi kesalahan",
            data: error
        }));
    };
};

exports.delete = async (req, res) => {
    const where = {
        id: req.body.id
    };
    try {
        const data = await books.destroy({
            where
        });
        return res.json(success({
            message: "data berhasil dihapus"
        }));
    } catch (error) {
        return res.json(failed({
            message: "terjadi kesalahan"
        }));
    };
};