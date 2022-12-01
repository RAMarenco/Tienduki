const SocialMedia = require("../model/socialMedia.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async(req, res) => {

    try {
        const {
            media
        } = req.body;

        const socialMedia = new SocialMedia({
            media: media
        });

        const newSocialMedia = await socialMedia.save();

        if (!newSocialMedia) {
            return res.status(409).json({ error: "Ocurrio un error al registrar una social media" });
        }
            return res.status(201).json(newSocialMedia);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {

    try {
        
        const socialMedia = await SocialMedia.find({ visible: false });

        if (!socialMedia) {
            return res.status(500).json({ error: "Ocurrio un error al traer todos los tipos de redes sociales" });
        }

        return res.status(201).json(socialMedia);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.findById = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const socialMedia = await SocialMedia.findById( identifier );
        
        if (!socialMedia) {
            return res.status(500).json({ error: "Ocurrio un error al traer todas las redes sociales"});
        }

        return res.status(201).json(socialMedia);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.delete = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const socialMedia = await SocialMedia.findByIdAndDelete( identifier );

        if (!socialMedia) {
            return res.status(409).json( { error: "Ocurrio un error al eliminar un tipo de red social"});
        } 
        
        return res.status(201).json(socialMedia);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const socialMedia = await SocialMedia.findByIdAndUpdate(identifier, data, {new: true});
        
        if (!socialMedia) {
            return res.status(409).json({ error: "Ocurrio un error al modificar un tipo de red social"});
        }

        return res.status(201).json(socialMedia);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;