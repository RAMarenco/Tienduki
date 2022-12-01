const express = require("express");
const router = express.Router();

const clientActivityController = require("../../controllers/clientActivity.controllers");

router.post("/", clientActivityController.create);
router.get("/getStoreActById/:identifier/:type", clientActivityController.getStoreActById)
router.get("/Store/:identifier", clientActivityController.getStoreAct)
router.get("/Product/:identifier", clientActivityController.getProductAct)

module.exports = router;