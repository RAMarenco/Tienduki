const StoreCategory = require("../model/storeCategory.model");
const debug = require("debug")("app:mongoose");
const Image = require("../model/image.model");
const { ObjectId } = require('mongodb');

const controller = {};

controller.create = async(req, res) => {
    try {
        
        const { category } = req.body;

        const storeCategory = new StoreCategory({
            category: category
        });

        const newStoreCategory = await storeCategory.save();


        if (!newStoreCategory) {
            return res.status(409).json({ error: "Ocurrio un error al registrar una categoria" });
        }
        
        return res.status(201).json(newStoreCategory);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findById = async (req, res) => {

    try {
        const { byId } = req.params;        

        const objectId = new ObjectId(byId);

        const store = await StoreCategory.aggregate(
            [             
                {
                    "$match": {
                        "$and": [
                            {
                                stores: {$exists: true, $ne: []}
                            },
                            {
                                stores: objectId
                            }
                        ]
                        
                    }
                },   
                {
                    "$lookup": {
                        "from": 'users', 
                        "localField": 'stores', 
                        "foreignField": '_id',
                        "let": {"userId": "$_id"},
                        pipeline: [
                            {
                                "$match": {
                                    "_id": ObjectId(objectId)
                                }
                            },
                            {
                                
                                "$lookup": {
                                    "from": 'images', 
                                    "localField": 'image_user', 
                                    "foreignField": '_id', 
                                    as: 'image_user',
                                    pipeline: [
                                        {
                                            "$lookup": {"from": 'imagetypes', "localField": 'id_image_type', "foreignField": '_id', as: 'id_image_type'}
                                        },
                                        {$unwind: '$id_image_type'},
                                    ]
                                }
                            },
                            {
                                
                                "$lookup": {"from": 'storeratings', "localField": 'store_rating', "foreignField": '_id', as: 'store_rating'}
                            }
                        ],
                        as: 'stores'
                    }
                }
            ]
        );

        if (!store) {
            return res.status(404).json({error: "Categoria no encontrada"});
        }
        return res.status(202).json(store)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAllProducts = async (req, res) => {

    try {
        
        const { storeCategory } = req.params;

        const store = await StoreCategory.find().where("category").equals(storeCategory).populate({
            path: "stores",
            match: {visible : false},
            populate: {
                path: "image_user",
                populate: {
                    path: "id_image_type"
                }
            }
        });
        
        if (!store) {
            return res.status(404).json({error: "Categoria no encontrada"});
        }
        return res.status(202).json(store)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findLimit = async (req, res) => {
    try {
        const { limit } = req.params;

        const store = await StoreCategory.find().
        populate({
            path: "stores",
            match: {visible : false},
            perDocumentLimit: limit,
            populate: [
                {path: "image_user",
                    populate: [
                        {path: "id_image_type"}
                    ]
                }
            ]
        });

        if (!store) {
            return res.status(404).json({error: "Categoria no encontrada"});
        }
        return res.status(202).json(store)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAllExceptStore = async (req, res) => {

    try {
        
        const store = await StoreCategory.find().select("-stores");
        

        if (!store) {
            return res.status(404).json({error: "Categoria no encontrada"});
        }
        return res.status(202).json(store)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {
    try {
        
        const store = await StoreCategory.aggregate(
            [
                {
                    $unwind: "$stores"
                },
                { $project : { stores : 1, _id:0 } },
                {
                    "$match": {
                        "$and": [
                            {
                                stores: {$exists: true, $ne: []}
                            },
                        ]
                        
                    }
                },
                {
                    "$lookup": {
                        "from": 'users', 
                        "localField": 'stores', 
                        "foreignField": '_id',
                        "let": {"userId": "$_id"},
                        pipeline: [
                            {
                                "$lookup": {
                                    "from": 'images', 
                                    "localField": 'image_user', 
                                    "foreignField": '_id', 
                                    as: 'image_user',
                                    pipeline: [
                                        {
                                            "$lookup": {"from": 'imagetypes', "localField": 'id_image_type', "foreignField": '_id', as: 'id_image_type'}
                                        },
                                        {$unwind: '$id_image_type'},
                                    ]
                                }
                            },
                            {
                                
                                "$lookup": {"from": 'storeratings', "localField": 'store_rating', "foreignField": '_id', as: 'store_rating'}
                            }
                        ],
                        as: 'stores'
                    },
                    
                }
            ]
        );
        
        if (!store) {
            return res.status(404).json({error: "Categoria no encontrada"});
        }
        return res.status(202).json(store)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;