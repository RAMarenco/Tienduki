const express = require("express");
const router = express.Router();

const productCollectionController = require("../../controllers/ProductCollection.controllers");

router.post("/", productCollectionController.create);
router.get("/:identifier", productCollectionController.findByStoreId);
router.get("/", productCollectionController.findAll);
router.put("/:identifier", productCollectionController.put);
router.delete("/:identifier", productCollectionController.delete);

module.exports = router;