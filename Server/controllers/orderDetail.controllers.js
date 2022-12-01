const OrderDetail = require("../model/orderDetail.model");
const Order = require("../model/order.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async (req, res) => {
    try {
        const {
            quantity, date_of_order, total, id_state, id_product, id_order
        } = req.body

        const orderDetail = new OrderDetail({
            quantity: quantity,
            date_of_order: date_of_order,
            total: total,
            id_state: id_state,
            id_product: id_product,
            id_order: id_order
        });

        const newOrderDetail = await orderDetail.save();

        const order = await Order.findOneAndUpdate(
            {_id: id_order},
            {
                "$push": {"detail": newOrderDetail._id}
            },{new:true}
        );

        if(!newOrderDetail) {
            return res.status(409).json({ error: "Ocurrió un error al agregar los detalles de la orden" });
        }

        return res.status(201).json(newOrderDetail);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.findAll = async (req, res) => {

    try {

        const orderDetail = await OrderDetail.find({ hidden: false })
        .populate({
            path: "id_state",
        })
        .populate({
            path: "id_product"
        })
        .populate({
            path: "id_order"
        })
        ;

        if (!orderDetail) {
            return res.status(404).json({error: "Productos de tienda no encontrado"});
        }
        return res.status(202).json(orderDetail)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findById = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const ordenDetail = await OrderDetail.findById( identifier );

        if (!ordenDetail) {
            return res.status(409).json({ error: "Ocurrio un error al traer una orden"})
        }

        return res.status(201).json(ordenDetail);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const orderDetail = await OrderDetail.findByIdAndDelete( identifier );

        if (!orderDetail) {
            return res.status(409).json( { error: "Ocurrio un error al eliminar una orden"})
        } 
        
        return res.status(201).json(orderDetail);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const orderDetail = await OrderDetail.updateMany({id_order: identifier}, {id_state: data.state});

        if (!orderDetail) {
            return res.status(409).json({ error: "Ocurrio un error al modificar el tipo de imagen"});
        }

        return res.status(201).json(orderDetail);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;