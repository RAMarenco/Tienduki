const Activity = require("../model/activity.model");
const ClientActivity = require("../model/clientActivity.model");
const debug = require("debug")("app:mongoose");
const { ObjectId } = require('mongodb');

const controller = {};

controller.create = async(req, res) => {
    try {
        
        const {
            id_element, type_activity, id_user
        } = req.body;

        const activity = new Activity({
            id_element: id_element,
            type_activity: type_activity
        });

        const newActivity = await activity.save();

        // Cuando se cree una actividad, se debe de agregr un clientActivity
        // id_element puede ser o el id_cliente o id_vendedor
        
        const buscar = await Activity.findOne({ id_element: id_element });

        const clientActivity = new ClientActivity({
            id_activity: buscar._id,
            id_user: id_user
        });

        const newClientActivity = await clientActivity.save();

        if (!newActivity) {
            return res.status(409).json({ error: "Ocurrio un error al registrar la actividad" });
        }
        
        res.status(201).json({"status": "ok"});        

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async(req, res) => {
    try {
        
        const { identifier } = req.params;

        const deleteClientActivity = await ClientActivity.findOneAndDelete(
            {id_activity: ObjectId(identifier)}
        )

        const activity = await Activity.findOneAndDelete( {_id: ObjectId(identifier)} );

        if (!activity) {
            return res.status(409).json({ error: "Ocurrio un error al eliminar una actividad" });
        }
        
        return res.status(201).json({status: "ok"});

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;