const express = require("express");
const router = express.Router();

const orderController = require("../../controllers/order.controllers");

router.post("/", orderController.create);
router.get("/", orderController.findAll);
router.get("/:identifier", orderController.findById);
router.get("/store/:identifier", orderController.findByIdStore);
router.put("/:identifier", orderController.put);
router.delete("/:identifier", orderController.delete);

module.exports = router;