const StoreCategorie = require("../model/storeCategorie.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async(req, res) => {
    try {
        
        const {
            id_store, id_store_category
        } = req.body;

        const storeCategorie = new StoreCategorie({
            id_store: id_store,
            id_store_category: id_store_category
        });

        const newStoreCategorie = await storeCategorie.save();


        if (!newStoreCategorie) {
            return res.status(409).json({ error: "Ocurrio un error al registrar un categoria de tienda" });
        }
        
        return res.status(201).json(newStoreCategorie);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {

    try {
        
        const storeCategorie = await StoreCategorie.find({ visible: false });        

        if (!storeCategorie) {
            return res.status(404).json({error: "Ocurrio un error al encontrar todas las categorias de una tienda"});
        }
        return res.status(202).json(storeCategorie)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findById = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const storeCategorie = await StoreCategorie.findById( identifier );
        
        if (!storeCategorie) {
            return res.status(500).json({ error: "Ocurrio un error al encontrar una categoria de tienda"});
        }

        return res.status(201).json(storeCategorie);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.delete = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const storeCategorie = await StoreCategorie.findByIdAndDelete( identifier );

        if (!storeCategorie) {
            return res.status(409).json( { error: "Ocurrio un error al eliminar una categoria de tienda"});
        } 
        
        return res.status(201).json(storeCategorie);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const storeCategorie = await StoreCategorie.findByIdAndUpdate(identifier, data, {new: true});
        
        if (!storeCategorie) {
            return res.status(409).json({ error: "Ocurrio un error al modificar una categoria de tienda"});
        }

        return res.status(201).json(storeCategorie);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;