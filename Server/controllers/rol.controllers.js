const Rol = require("../model/rol.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async(req, res) => {
    try {
        
        const {rol} = req.body;

        const _rol = new Rol({
            rol: rol
        });

        const newRol = await _rol.save();


        if (!newRol) {
            return res.status(409).json({ error: "Ocurrio un error al registrar un rol" });
        }
        
        return res.status(201).json(newRol);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {

    try {
        
        const rol = await Rol.find({ visible: false });

        if (!rol) {
            return res.status(500).json({ error: "Ocurrio un error al traer todas los roles" });
        }

        return res.status(201).json(rol);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.findById = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const rol = await Rol.findById( identifier );
        
        if (!rol) {
            return res.status(500).json({ error: "Ocurrio un error al traer un rol"});
        }

        return res.status(201).json(rol);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.delete = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const rol = await Rol.findByIdAndDelete( identifier );

        

        if (!rol) {
            return res.status(409).json( { error: "Ocurrio un error al eliminar un rol"});
        } 
        
        return res.status(201).json(rol);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const rol = await Rol.findByIdAndUpdate(identifier, data, {new: true});

        if (!rol) {
            return res.status(409).json({ error: "Ocurrio un error al modificar un rol"});
        }

        return res.status(201).json(rol);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;