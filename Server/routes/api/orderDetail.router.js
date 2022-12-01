const express = require("express");
const router = express.Router();

const orderDetailController = require("../../controllers/orderDetail.controllers");

router.post("/", orderDetailController.create);
router.get("/", orderDetailController.findAll);
router.get("/:identifier", orderDetailController.findById);
router.put("/:identifier", orderDetailController.put);
router.delete("/:identifier", orderDetailController.delete);

module.exports = router;