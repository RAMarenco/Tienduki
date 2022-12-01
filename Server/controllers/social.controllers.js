const Social = require("../model/social.model");
const { populate } = require("../model/socialMedia.model");
const userModel = require("../model/user.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async(req, res) => {

    try {
        const {
            url, id_user, id_social_media
        } = req.body;

        const social = new Social({
            url: url,
            id_user: id_user,
            id_social_media: id_social_media,
        });

        const newSocial = await social.save();

        let userSocial = await userModel.Users.findOne({}).where({ _id: id_user });
        userSocial.socials = userSocial.socials.concat(newSocial._id);
        await userSocial.save();
        
        if (!newSocial) {
            return res.status(409).json({ error: "Ocurrio un error al registrar una red social" });
        }
            return res.status(201).json(newSocial);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {

    try {
        
        const social = await Social.find({ visible: false });

        if (!social) {
            return res.status(500).json({ error: "Ocurrio un error al traer todas las redes sociales" });
        }

        return res.status(201).json(social);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.findById = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const social = await Social.findById( identifier );
        
        if (!social) {
            return res.status(500).json({ error: "Ocurrio un error al traer todas las redes sociales"});
        }

        return res.status(201).json(social);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.delete = async (req, res) => {

    try {

        const { identifier } = req.params;

        const buscar = await Social.findById( identifier );
        
        let deleteUserSocial = await userModel.Users.findOneAndUpdate(
            { _id: buscar.id_user },
            {$pull:
                { 
                socials: identifier 
                }
            }
        );
        
        await deleteUserSocial.save();

        const social = await Social.findByIdAndDelete( identifier );

        if (!social) {
            return res.status(409).json( { error: "Ocurrio un error al eliminar una red social"});
        } 
        
        return res.status(201).json(social);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const social = await Social.findByIdAndUpdate(identifier, data, {new: true});
        
        if (!social) {
            return res.status(409).json({ error: "Ocurrio un error al modificar una red social"});
        }

        return res.status(201).json(social);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;