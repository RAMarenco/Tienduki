const express = require("express");
const router = express.Router();

const imagePruebaController = require("../../controllers/imagePrueba.controllers");

router.post("/", imagePruebaController.create);
router.delete("/:identifier", imagePruebaController.delete);
router.put("/:identifier", imagePruebaController.put);

module.exports = router;