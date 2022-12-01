const ClientWishList = require("../model/clientWishList.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async(req, res) => {
    try {
        
        const {
            id_product, id_client
        } = req.body;

        const clientWishList = new ClientWishList({
            id_product: id_product,
            id_client: id_client
        });

        const newClientWishList = await clientWishList.save();


        if (!newClientWishList) {
            return res.status(409).json({ error: "Ocurrio un error al registrar una lista de deseos" });
        }
        
        return res.status(201).json(newClientWishList);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async(req, res) => {
    try {
        
        const clientWishList = await ClientWishList.find({ hidden: false })
        .populate({
            path: "id_product"
        })
        .populate({
            path: "id_client"
        });

        if (!clientWishList) {
            return res.status(409).json({ error: "Ocurrio un error al traer todas las listas de deseos" });
        }
        
        return res.status(201).json(clientWishList);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findByIdAll = async (req, res) => {

    try {
        
        const { clientId } = req.params;

        const clientWishList = await ClientWishList.find({id_client: clientId}).select("-id_client -_id").populate({
            path: "id_product",
            populate: [
                {
                    path: "_id_store",
                    select: "-password -salt -hashedPassword"
                },
                {
                    path: "image_product"
                }
            ]
        });

        if (!clientWishList) {
            return res.status(409).json({ error: "Ocurrio un error al traer una lista de deseo"})
        }

        return res.status(201).json(clientWishList);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findByIdOne = async (req, res) => {

    try {
        
        const { clientId, productId } = req.params;

        const clientWishList = await ClientWishList.findOne({id_product: productId, id_client: clientId});

        if (!clientWishList) {
            return res.status(409).json({ error: "Ocurrio un error al traer una lista de deseo"})
        }

        return res.status(201).json(clientWishList);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async (req, res) => {

    try {        
        const { id_client, id_product } = req.body;

        const clientWishList = await ClientWishList.findOneAndDelete( {id_product: id_product, id_client: id_client} );

        if (!clientWishList) {
            return res.status(409).json({ error: "Ocurrio un error al eliminar una lista de deseos"})
        }

        return res.status(201).json(clientWishList);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const clientWishList = await ClientWishList.findByIdAndUpdate( identifier, data, {new: true} );

        if (!clientWishList) {
            return res.status(409).json({ error: "Ocurrio un error al actualizar una lista de deseo"})
        }

        return res.status(201).json(clientWishList);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;