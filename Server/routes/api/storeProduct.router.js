const express = require("express");
const router = express.Router();

const storeProductController = require("../../controllers/storeProduct.controllers");

router.post("/", storeProductController.create);
router.get("/", storeProductController.findAll);
router.get("/collection/:identifier", storeProductController.findByCollection);
router.get("/id/:identifier", storeProductController.findById);
router.get("/store/:identifier", storeProductController.findByStoreId);
router.delete("/:identifier", storeProductController.delete);
router.put("/:identifier", storeProductController.put);

module.exports = router;