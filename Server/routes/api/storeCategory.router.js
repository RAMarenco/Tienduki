const express = require("express");
const router = express.Router();

const storeCategoryController = require("../../controllers/storeCategory.controllers");

router.post("/", storeCategoryController.create);
router.get("/byId/:byId", storeCategoryController.findById);
router.get("/storeCategory/:storeCategory", storeCategoryController.findAllProducts);
router.get("/limit/:limit", storeCategoryController.findLimit);
router.get("/", storeCategoryController.findAllExceptStore);
router.get("/all/", storeCategoryController.findAll);
module.exports = router;