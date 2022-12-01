const {Users} = require("../model/user.model");
const StoreCategory = require("../model/storeCategory.model");
const StoreCategorie = require("../model/storeCategorie.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async(req, res) => {

    try {
        const {
            username, name, lastname, datebirth, gender, email, password, category, id_rol
        } = req.body;

        const user = new Users({
            username: username,
            name: name,
            lastname: lastname,
            datebirth: datebirth,
            gender: gender,
            email: email,
            password: password,
            id_rol: id_rol
        });
                
        const newUser = await user.save();

        if(id_rol === "637d209f43311e1bfa18b7b2"){
            let storecategory = await StoreCategory.findOne({}).where({category: category});
            storecategory.stores = storecategory.stores.concat(newUser._id);
            await storecategory.save();
        }

        if (!newUser) {
            return res.status(409).json({ error: "Ocurrio un error al registrar el usuario" });
        }
            return res.status(201).json(newUser);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findById = async (req, res) => {

    try {
        const { identifier } = req.params;
        
        const user = await Users.findById( identifier ).select("-hashedPassword -salt")
        .populate({
            path: "socials",
            populate: [
                {path: "id_social_media"}
            ]
        }).
        populate({
            path: "image_user",
            populate: [
                {path: "id_image_type"}
            ]
        }).
        populate({
            path: "store_rating",
            populate: [
                {path: "store"}
            ]
        }).
        populate({
            path: "id_rol"            
        });

        if (!user) {
            return res.status(404).json({error: "Usuario no encontrado"});
        }
        return res.status(202).json(user)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {

    try {
        
        const users = await Users.find({ hidden: false }).populate("id_rol");        

        if (!users) {
            return res.status(404).json({error: "Usuario no encontrado"});
        }
        return res.status(202).json(users)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async (req, res) => {

    try {
        const { identifier } = req.params;

        const buscar = await StoreCategorie.findOne({id_store: identifier});


        let deleteUserStoreCategory = await StoreCategory.findOneAndUpdate(
            { _id: buscar.id_store_category },
            {
                $pull: {
                    stores: identifier
                }
            }
        )

        await deleteUserStoreCategory.save();

        const user = await Users.findByIdAndDelete( identifier );

        if (!user) {
            return res.status(404).json({error: "Usuario no encontrado"});
        }
        return res.status(202).json(user)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        const { identifier } = req.params;
        const data = {...req.body};

        const encontrar = await Users.findById( identifier );
        if (data.hashedPassword) {
            data.hashedPassword = encontrar.encryptPassword(data.hashedPassword);
        }
        
        const updatedUser = await Users.findByIdAndUpdate(identifier, data, {new: true});
        

        res.status(201).json(updatedUser);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }

}

module.exports = controller;