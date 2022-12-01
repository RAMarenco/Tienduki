const StoreRating = require("../model/storeRating.model");
const userModel = require("../model/user.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async(req, res) => {

    try {
        const {
            rating, client, store
        } = req.body;

        const storeRating = new StoreRating({
            rating: rating,
            client: client,
            store: store
        });

        const newStoreRating = await storeRating.save();

        let userRating = await userModel.Users.findOne({}).where({ _id: client });
        userRating.store_rating = userRating.store_rating.concat(newStoreRating._id);
        await userRating.save();

        if (!newStoreRating) {
            return res.status(409).json({ error: "Ocurrio un error al registrar un puntaje del usuario" });
        }
            return res.status(201).json(newStoreRating);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findById = async (req, res) => {

    try {
        const { identifier } = req.params;
        const rating = await StoreRating.find().where("store").equals(identifier);

        if (!rating) {
            return res.status(404).json({error: "Ocurrio un error al traer los ratings de tiendas"});
        }
        return res.status(202).json(rating)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {

    try {
        
        const storeRating = await StoreRating.find({ visible: false }).populate("client").populate(
            {
                path: "store",
                select: "-password -hashedPassword -salt"
            }
        );        

        if (!storeRating) {
            return res.status(404).json({error: "Ocurrio un error al traer un rating de tienda"});
        }
        return res.status(202).json(storeRating)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async (req, res) => {

    try {
        const { identifier } = req.params;

        const buscar = await StoreRating.findById( identifier );

        let deleteUserStoreRating = await userModel.Users.findOneAndUpdate(
            { _id: buscar.client },
            {
                $pull: {
                    store_rating: identifier
                }
            }
        )

        await deleteUserStoreRating.save();

        const storeRating = await StoreRating.findByIdAndDelete( identifier );

        if (!storeRating) {
            return res.status(404).json({error: "Ocurrio un error al eliminar una rating de tienda"});
        }
        return res.status(202).json(storeRating)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        const { identifier } = req.params;
        const data = {...req.body};

        const storeRating = await StoreRating.findByIdAndUpdate(identifier, data, {new: true});

        if (!storeRating) {
            return res.status(404).json({error: "Ocurrio un error al modificar una rating de tienda"});
        }
        return res.status(202).json(storeRating)
        

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}


module.exports = controller;