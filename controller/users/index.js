const {
    success,
    failed
} = require("../../config/response");
const {
    users
} = require("../../models");

exports.get = async (req, res) => {
    try {
        const data = await users.findAll();
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
        address: req.body.address,
        phone: req.body.phone,
        gender: req.body.gender
    };
    try {
        const data = await users.create(payload);
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
        address: req.body.address,
        phone: req.body.phone,
        gender: req.body.gender
    };
    const where = {
        id: req.body.id
    };
    try {
        const data = await users.update(payload, {
            where
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
        const data = await users.destroy({
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