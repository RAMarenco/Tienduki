const debug = require("debug")("app:mongoose");
const StoreProduct = require("../model/storeProduct.model");
const ProductCollection = require("../model/productCollection.model");
const Orders = require("../model/order.model");
const OrderDetail = require("../model/orderDetail.model");
const ClientWishList = require("../model/clientWishList.model");
const Activity = require("../model/activity.model");
const { ObjectId } = require('mongodb');

const controller = {};

controller.create = async(req, res) => {
    try {
        const {
            name, description, price, visible, _id_product_collection, _id_store
        } = req.body;

        const storeProduct = new StoreProduct({
            name: name,
            description: description,
            price: price,
            visible: visible,
            _id_product_collection: _id_product_collection,
            _id_store: _id_store
        });

        const newStoreProduct = await storeProduct.save();

        let productCollection = await ProductCollection.findOne({}).where({ _id_store: _id_store });
        productCollection.product_collections = productCollection.product_collections.concat(newStoreProduct._id);
        await productCollection.save();

        if(!newStoreProduct) {
            return res.status(409).json({ error: "Ocurrió un error al agregar un producto" });
        }

        return res.status(201).json(newStoreProduct);

    } catch (error) {
        debug({error});
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

controller.findById = async (req, res) => {

    try {
        const { identifier } = req.params;

        const storeProduct = await 
            StoreProduct
                .findById( identifier )
                .populate("image_product")
                .populate({path: "_id_product_collection", select: "-product_collections"});

        if (!storeProduct) {
            return res.status(404).json({error: "Producto de tienda no encontrado"});
        }
        return res.status(202).json(storeProduct)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findByStoreId = async (req, res) => {

    try {
        const { identifier } = req.params;

        const storeProduct = await 
            StoreProduct
                .find( {_id_store: identifier} )
                .populate("image_product");

        if (!storeProduct) {
            return res.status(404).json({error: "Producto de tienda no encontrado"});
        }
        return res.status(202).json(storeProduct)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findByCollection = async (req, res) => {

    try {
        const { identifier } = req.params;

        const storeProduct = await StoreProduct.find( {_id_product_collection: `${identifier}`} )
        .populate({
            path: "_id_product_collection",
        })
        .populate({
            path: "_id_store"
        })
        .populate({
            path: "image_product"
        });

        if (!storeProduct) {
            return res.status(404).json({error: "Producto de tienda no encontrado"});
        }
        return res.status(202).json(storeProduct)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {

    try {

        const storeProduct = await StoreProduct.find({ hidden: false })
        .populate({
            path: "_id_product_collection",
        })
        .populate({
            path: "_id_store"
        })
        .populate({
            path: "image_product"
        });

        if (!storeProduct) {
            return res.status(404).json({error: "Productos de tienda no encontrado"});
        }
        return res.status(202).json(storeProduct)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.delete = async (req, res) => {

    try {
        const { identifier } = req.params;

        //Borrando referencia del producto seleccionado en tabla ProductCollection
        const buscarStoreProduct = await StoreProduct.findOne({ _id: identifier });
        let eliminarReferenciaProductCollection = await ProductCollection.findOneAndUpdate(
            { _id_store: buscarStoreProduct._id_store},
            {
                $pull : {
                    product_collections: identifier
                }
            }
        )

        await eliminarReferenciaProductCollection.save();

        //Borrando de orden la referencia de detalle de orden
        const buscarOrderDetail = await OrderDetail.find({ id_product: buscarStoreProduct._id }).select("_id");
    
        let idDetails = [];
        buscarOrderDetail.forEach(e => {
            idDetails = [...idDetails, e.id];
        })

        const eliminarOrden = await Orders.deleteMany(
            {
                detail: {
                    $in: idDetails
                }
            }
        )

        //Borrando orden en caso de que se quede vacia
        const comprobarArreglo = await Orders.find(
            { detail: 
                {
                    $in: idDetails
                }
            }  
        );
    
        //Borrando detalle de orden 
        const eliminarOrderDetail = await OrderDetail.deleteMany({ id_product: identifier })
        
        //Borrando clientWishList dependiendo del producto
        const eliminarClientWishList = await ClientWishList.deleteMany({ id_product: identifier });
        
        //Borrando actividad dependiendo del producto
        const eliminarActivity = await Activity.deleteMany({ id_element: identifier})

        //Borrando StoreProduct
        const storeProduct = await StoreProduct.findByIdAndDelete( identifier );

        if (!storeProduct) {
            return res.status(404).json({error: "Producto de tienda no encontrado"});
        }
        return res.status(202).json(storeProduct)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.put = async (req, res) => {

    try {
        const { identifier } = req.params;
        const data = {...req.body};

        const updatedStoreProduct = await StoreProduct.findByIdAndUpdate(identifier, data, {new: true});

        res.status(201).json(updatedStoreProduct);
        

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }

}


module.exports = controller;