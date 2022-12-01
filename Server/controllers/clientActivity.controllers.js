const ClientActivity = require("../model/clientActivity.model");
const debug = require("debug")("app:mongoose");
const { ObjectId } = require('mongodb');

const controller = {};

controller.create = async(req, res) => {
    try {
        
        const {
            id_activity, id_user
        } = req.body;

        const clientActivity = new ClientActivity({
            id_activity: id_activity,
            id_user: id_user
        });

        const newClientActivity = await clientActivity.save();


        if (!newClientActivity) {
            return res.status(409).json({ error: "Ocurrio un error al registrar una actividad" });
        }
        
        return res.status(201).json(newClientActivity);

        } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.getStoreActById = async (req, res) => {

    try {
        const { identifier, type } = req.params;
        
        const clientActivity = await ClientActivity.aggregate(
            [                              
                {
                    "$match": {
                        "$and": [
                            {
                                id_activity: {$exists: true, $ne: null}
                            },
                            {
                                "id_user": ObjectId(identifier)
                            }
                        ]
                        
                    }
                },
                {
                    "$lookup": {
                        "from": 'activities', 
                        "localField": 'id_activity', 
                        "foreignField": '_id',
                        //"let": { "type_activity": "$type_activity" },
                        pipeline: [
                            {
                                "$match": {
                                    $expr: {
                                        "$and": [
                                            {
                                                $eq: ["$type_activity", type]
                                            },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'id_activity',
                    },
                    
                },
                {
                    $unwind: "$id_activity"
                },  
            ]
        )

        if (!clientActivity) {
            return res.status(404).json({error: "Actividades no encontradas"});
        }
        return res.status(202).json(clientActivity)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.getStoreAct = async (req, res) => {

    try {
        const { identifier } = req.params;
        
        const clientActivity = await ClientActivity.aggregate(
            [
                {
                    "$match": {
                        "$and": [
                            {
                                id_activity: {$exists: true, $ne: null}
                            },
                            {
                                "id_user": ObjectId(identifier)
                            }
                        ]
                        
                    }
                },
                {
                    "$lookup": {
                        "from": 'activities', 
                        "localField": 'id_activity', 
                        "foreignField": '_id',
                        pipeline: [
                            {
                                "$lookup": {
                                    "from": 'users', 
                                    "localField": 'id_element', 
                                    "foreignField": '_id',
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
                                    ],                                    
                                    as: 'id_element',
                                },
                            },                            
                            {$unwind: "$id_element"},                            
                            
                        ],
                        as: 'id_activity',
                    },
                    
                },
                {
                    $unwind: "$id_activity"
                },  
            ]
        )

        if (!clientActivity) {
            return res.status(404).json({error: "Actividades no encontradas"});
        }
        return res.status(202).json(clientActivity)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.getProductAct = async (req, res) => {

    try {
        const { identifier } = req.params;
        
        const clientActivity = await ClientActivity.aggregate(
            [                              
                {
                    "$match": {
                        "$and": [
                            {
                                id_activity: {$exists: true, $ne: null}
                            },
                            {
                                "id_user": ObjectId(identifier)
                            }
                        ]
                        
                    }
                },
                {
                    "$lookup": {
                        "from": 'activities', 
                        "localField": 'id_activity', 
                        "foreignField": '_id',
                        pipeline: [
                            {
                                "$lookup": {
                                    "from": 'storeproducts', 
                                    "localField": 'id_element', 
                                    "foreignField": '_id',
                                    pipeline: [
                                        {
                                
                                            "$lookup": {
                                                "from": 'productimages', 
                                                "localField": 'image_product', 
                                                "foreignField": '_id', 
                                                as: 'image_product',
                                            }
                                        },
                                        {
                                            "$lookup": {
                                                "from": 'users', 
                                                "localField": '_id_store', 
                                                "foreignField": '_id',
                                                pipeline: [
                                                    { $project : { password: 0, hashedPassword: 0, salt: 0 } },
                                                ],
                                                as: '_id_store',
                                            },
                                        },
                                        {$unwind: "$_id_store"}
                                    ], 
                                    as: 'id_element',
                                },
                            },                           
                            {$unwind: "$id_element"}
                            
                        ],
                        as: 'id_activity',
                    },
                    
                },
                {
                    $unwind: "$id_activity"
                },  
            ]
        )

        if (!clientActivity) {
            return res.status(404).json({error: "Actividades no encontradas"});
        }
        return res.status(202).json(clientActivity)

    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

module.exports = controller;