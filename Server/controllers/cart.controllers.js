const Cart = require("../model/cart.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async(req, res) => {
    try {
        
        const {
            quantity, id_client, id_product
        } = req.body;

        const cart = new Cart({
            quantity: quantity,
            id_client: id_client,
            id_product: id_product
        });

        const newCart = await cart.save();


        if (!newCart) {
            return res.status(409).json({ error: "Ocurrio un error al registrar una producto al carrito" });
        }
        
        return res.status(201).json(newCart);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async(req, res) => {
    try {
        
        const cart = await Cart.find({ hidden: false })
        .populate({
            path: "id_product"
        })
        .populate({
            path: "id_client"
        });

        if (!cart) {
            return res.status(409).json({ error: "Ocurrio un error al registrar una lista de deseos" });
        }
        
        return res.status(201).json(cart);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findById = async (req, res) => {

    try {
        
        const { identifier } = req.params;
        
        const cart = await Cart.findById( identifier );

        if (!cart) {
            return res.status(409).json({ error: "Ocurrio un error al buscar algo del carrito"});
        }

        return res.status(201).json(cart);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const cart = await Cart.findByIdAndDelete( identifier );

        if (!cart) {
            return res.status(409).json({ error: "Ocurrio un error al eliminar campo del carrito"});
        }

        return res.status(201).json(cart);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const cart = await Cart.findByIdAndUpdate(identifier, data, {new: true});

        if (!cart) {
            return res.status(409).json({ error: "Ocurrio un error al editar los datos del carrito"});
        }

        return res.status(201).json(cart);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;