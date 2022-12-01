const ImageType = require("../model/imageType.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async(req, res) => {
    try {
        
        const { category } = req.body;

        const imageType = new ImageType({
            category: category
        });

        const newImageType = await imageType.save();


        if (!newImageType) {
            return res.status(409).json({ error: "Ocurrio un error al registrar un tipo de imagen" });
        }
        
        return res.status(201).json(newImageType);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {

    try {
        
        const imageType = await ImageType.find({ visible: false });

        if (!imageType) {
            return res.status(409).json({ error: "Ocurrio un error al traer todos los tipos de imagen"})
        }

        return res.status(201).json(imageType);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findById = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const imageType = await ImageType.findById( identifier );

        if (!imageType) {
            return res.status(409).json({ error: "Ocurrio un error al traer el tipo de imagen"})
        }

        return res.status(201).json(imageType);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const imageType = await ImageType.findByIdAndDelete( identifier );

        if (!imageType) {
            return res.status(409).json( { error: "Ocurrio un error al eliminar el tipo de imagen"})
        } 
        
        return res.status(201).json(imageType);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const imageType = await ImageType.findByIdAndUpdate(identifier, data, {new: true});

        if (!imageType) {
            return res.status(409).json({ error: "Ocurrio un error al modificar el tipo de imagen"});
        }

        return res.status(201).json(imageType);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;