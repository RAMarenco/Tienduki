const ProductCollection = require("../model/productCollection.model");
const debug = require("debug")("app:mongoose");

const controller = {};

controller.create = async (req, res) => {
    try {
        const {
            collectionName, _id_store
        } = req.body

        const productCollection = new ProductCollection({
            collectionName: collectionName,
            _id_store: _id_store
        });

        const newProductCollection = await productCollection.save();

        if(!newProductCollection) {
            return res.status(409).json({ error: "Ocurrió un error al agregar una colección de producto" });
        }

        return res.status(201).json(newProductCollection);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.findAll = async (req, res) => {

    try {
        
        const productCollection = await ProductCollection.find({ visible: false });

        if (!productCollection) {
            return res.status(500).json({ error: "Ocurrio un error al traer todas las colecciones de productos" });
        }

        return res.status(201).json(productCollection);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.findByStoreId = async (req, res) => {

    try {
        const { identifier } = req.params;

        const productCollection = 
            await ProductCollection
                .find()
                .where(
                    {_id_store: identifier},                    
                )
                .populate({
                    path: "product_collections",
                    match: {visible: true},
                    populate: {
                        path: "image_product"
                    }
                });

        if (!productCollection) {
            return res.status(404).json({error: "Producto de tienda no encontrado"});
        }
        return res.status(202).json(productCollection)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const productCollection = await ProductCollection.findByIdAndDelete( identifier );

        if (!productCollection) {
            return res.status(409).json( { error: "Ocurrio un error al eliminar un estado de orden"})
        } 
        
        return res.status(201).json(productCollection);
    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}
  
controller.put = async (req, res) => {
    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const productCollection = await ProductCollection.findByIdAndUpdate(identifier, data, {new: true});

        if (!productCollection) {
            return res.status(409).json({ error: "Ocurrio un error al modificar el tipo de imagen"});
        }

        return res.status(201).json(productCollection);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}
module.exports = controller;