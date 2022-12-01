const ProductImage = require("../model/productImage.model");
const StoreProductModel = require("../model/storeProduct.model");
const debug = require("debug")("app:mongoose");


const controller = {};

controller.create = async(req, res) => {

    try {
        const {
            imageUrl, id_store, id_product
        } = req.body;

        const productImage = new ProductImage({
            imageUrl: imageUrl,
            id_store: id_store
        });

        const newProductImage = await productImage.save();

        let imageProduct = await StoreProductModel.findOne({}).where({_id: id_product});
        imageProduct.image_product = imageProduct.image_product.concat(newProductImage._id);
        await imageProduct.save();

        if (!newProductImage) {
            return res.status(409).json({ error: "Ocurrio un error al registrar una imagen del producto" });
        }
            return res.status(201).json(newProductImage);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {

    try {
        
        const productImage = await ProductImage.find({ visible: false });

        if (!productImage) {
            return res.status(500).json({ error: "Ocurrio un error al traer todas las imagenes de productos" });
        }

        return res.status(201).json(productImage);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.findById = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const productImage = await ProductImage.findById( identifier );
        
        if (!productImage) {
            return res.status(500).json({ error: "Ocurrio un error al traer una imagen de producto"});
        }

        return res.status(201).json(productImage);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.delete = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const productImage = await ProductImage.findByIdAndDelete( identifier );

        if (!productImage) {
            return res.status(409).json( { error: "Ocurrio un error al eliminar una imagen de producto"})
        } 
        
        return res.status(201).json(productImage);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        
        const { identifier } = req.params;
        const data = {...req.body};

        const productImage = await ProductImage.findByIdAndUpdate(identifier, data, {new: true});

        if (!productImage) {
            return res.status(409).json({ error: "Ocurrio un error al modificar la imagen del producto"});
        }

        return res.status(201).json(productImage);

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;