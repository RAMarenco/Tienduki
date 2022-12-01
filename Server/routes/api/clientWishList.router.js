const express = require("express");
const router = express.Router();

const clientWishListController = require("../../controllers/clientWishList.controllers");

router.post("/", clientWishListController.create);
router.get("/", clientWishListController.findAll);
router.get("/All/:clientId", clientWishListController.findByIdAll);
router.get("/One/:clientId/:productId", clientWishListController.findByIdOne);
router.delete("/", clientWishListController.delete);
router.put("/:identifier", clientWishListController.put);

module.exports = router;