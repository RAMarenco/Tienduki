const Order = require("../model/order.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async(req, res) => {
    try {
        
        const { 
            id_client, id_store
         } = req.body;

        const order = new Order({
            id_client: id_client,
            id_store: id_store
        });

        const newOrder = await order.save();


        if (!newOrder) {
            return res.status(409).json({ error: "Ocurrio un error al registrar un tipo de orden" });
        }
        
        return res.status(201).json(newOrder);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {

    try {
        
        const orden = await Order.find({ visible: false });

        if (!orden) {
            return res.status(409).json({ error: "Ocurrio un error al traer todos las ordenes"})
        }

        return res.status(201).json(orden);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findById = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const orden = await Order.find({ id_client: identifier }).
        populate({
            path:"detail",
            populate: [
                {
                    path: "id_product"
                },
                {
                    path: "id_state"
                }
            ],
        }).
        populate({
            path:"id_store",
            select: "-password -hashedPassword -salt",
            populate: {
                path: "image_user",
                populate: {
                    path: "id_image_type"
                }
            }
        });

        if (!orden) {
            return res.status(409).json({ error: "Ocurrio un error al traer una orden"})
        }

        return res.status(201).json(orden);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findByIdStore = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const orden = await Order.find({ id_store: identifier }).
        populate({
            path:"detail",
            populate: [
                {
                    path: "id_product"
                },
                {
                    path: "id_state"
                }
            ],
        }).
        populate({
            path:"id_client",
            select: "-password -hashedPassword -salt -datebirth -gender -store_rating -id_rol",
            populate: {
                path: "image_user",
                populate: {
                    path: "id_image_type"
                }
            }
        });

        if (!orden) {
            return res.status(409).json({ error: "Ocurrio un error al traer una orden"})
        }

        return res.status(201).json(orden);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const orden = await Order.findByIdAndDelete( identifier );

        if (!orden) {
            return res.status(409).json( { error: "Ocurrio un error al eliminar una orden"})
        } 
        
        return res.status(201).json(orden);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const orden = await Order.findByIdAndUpdate(identifier, data, {new: true});

        if (!orden) {
            return res.status(409).json({ error: "Ocurrio un error al modificar el tipo de imagen"});
        }

        return res.status(201).json(orden);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;