const Image = require("../model/image.model");
const userModel = require("../model/user.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async(req, res) => {
    try {
        
        const {
            image, id_image_type, id_user
        } = req.body;

        const imageUrl = new Image({
            imageUrl: image,
            id_image_type: id_image_type,
            id_user: id_user
        });

        const newImage = await imageUrl.save();

        let userImage = await userModel.Users.findOne({}).where({ _id: id_user });
        userImage.image_user = userImage.image_user.concat(newImage._id);
        await userImage.save();

        if (!newImage) {
            return res.status(409).json({ error: "Ocurrio un error al registrar la imagen" });
        }
        
        return res.status(201).json(newImage);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async(req, res) => {
    try {
        
        const image = await Image.find({ visible: false });

        if (!image) {
            return res.status(409).json({ error: "Ocurrio un error al traer todas las imagenes" });
        }
        
        return res.status(201).json(image);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findById = async(req, res) => {
    try {
        
        const { identifier } = req.params;

        const image = await Image.findById( identifier );

        if (!image) {
            return res.status(409).json({ error: "Ocurrio un error al traer una imagen" });
        }
        
        return res.status(201).json(image);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async(req, res) => {
    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const image = await Image.findByIdAndUpdate( identifier, data, {new:true} );

        if (!image) {
            return res.status(409).json({ error: "Ocurrio un error al editar una imagen" });
        }
        
        return res.status(201).json(image);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async(req, res) => {
    try {
        
        const { identifier } = req.params;

        const buscar = await Image.findById( identifier )

        let deleteUserImage = await userModel.Users.findOneAndUpdate(
            { _id: buscar.id_user },
            {
                $pull: {
                    image_user: identifier
                }
            }
        )

        const image = await Image.findByIdAndDelete( identifier );

        if (!image) {
            return res.status(409).json({ error: "Ocurrio un error al eliminar una imagen" });
        }
        
        return res.status(201).json(image);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}
module.exports = controller;