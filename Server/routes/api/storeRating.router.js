const express = require("express");
const router = express.Router();

const storeRatingController = require("../../controllers/storeRating.controllers");

router.post("/", storeRatingController.create);
router.get("/:identifier", storeRatingController.findById);
router.get("/", storeRatingController.findAll);
router.put("/:identifier", storeRatingController.put);
router.delete("/:identifier", storeRatingController.delete);

module.exports = router;