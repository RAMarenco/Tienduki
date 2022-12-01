const OrderState = require("../model/orderState.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async (req, res) => {
    try {
        const {
            state
        } = req.body

        const orderState = new OrderState({
            state: state
        });

        const newOrder = await orderState.save();

        if(!newOrder) {
            return res.status(409).json({ error: "Ocurrió un error al agregar un estado de orden" });
        }

        return res.status(201).json(newOrder);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.findAll = async (req, res) => {

    try {

        const orderState = await OrderState.find({ visible: false });

        if (!orderState) {
            return res.status(404).json({error: "Ocurrio un error al traer todos los estados de orden"});
        }
        return res.status(202).json(orderState)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findById = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const orderState = await OrderState.findById( identifier );

        if (!orderState) {
            return res.status(409).json({ error: "Ocurrio un error al traer un estado de orden"})
        }

        return res.status(201).json(orderState);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const orderState = await OrderState.findByIdAndDelete( identifier );

        if (!orderState) {
            return res.status(409).json( { error: "Ocurrio un error al eliminar un estado de orden"})
        } 
        
        return res.status(201).json(orderState);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const orderState = await OrderState.findByIdAndUpdate(identifier, data, {new: true});

        if (!orderState) {
            return res.status(409).json({ error: "Ocurrio un error al modificar el tipo de imagen"});
        }

        return res.status(201).json(orderState);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;