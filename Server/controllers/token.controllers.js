const Token = require("../model/token.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async(req, res) => {

    try {
        const {
            token, expiration_date, id_user, expired
        } = req.body;

        const Addtoken = new Token({
            token: token,
            expiration_date: expiration_date,
            id_user: id_user,
            expired: expired
        });

        const newToken = await Addtoken.save();

        if (!newToken) {
            return res.status(409).json({ error: "Ocurrio un error al registrar el token" });
        }
            return res.status(201).json(newToken);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findById = async (req, res) => {

    try {
        const { identifier } = req.params;
        const token = await Token.find().where({_id: identifier});

        if (!token) {
            return res.status(404).json({error: "Ocurrio un error al traer todos los tokens"});
        }
        return res.status(202).json(token)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {

    try {
        
        const token = await Token.find({ visible: false });        

        if (!token) {
            return res.status(404).json({error: "Ocurrio un error al traer un token"});
        }
        return res.status(202).json(token)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async (req, res) => {

    try {
        const { identifier } = req.params;

        const token = await Token.findByIdAndDelete( identifier );

        if (!token) {
            return res.status(404).json({error: "Ocurrio un error al eliminar un token"});
        }
        return res.status(202).json(token)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        const { identifier } = req.params;
        const data = {...req.body};

        const token = await Token.findByIdAndUpdate(identifier, data, {new: true});

        if (!token) {
            return res.status(404).json({error: "Ocurrio un error al modificar un token"});
        }
        return res.status(202).json(token)
        

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;