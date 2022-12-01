const express = require("express");
const router = express.Router();

const productImageController = require("../../controllers/productImage.controllers");

router.post("/", productImageController.create);
router.get("/", productImageController.findAll);
router.get("/:identifier", productImageController.findById);
router.put("/:identifier", productImageController.put);
router.delete("/:identifier", productImageController.delete);

module.exports = router;