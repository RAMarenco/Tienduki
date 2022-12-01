const express = require("express");
const router = express.Router();

const socialMediaController = require("../../controllers/socialMedia.controllers");

router.post("/", socialMediaController.create);
router.get("/", socialMediaController.findAll);
router.get("/:identifier", socialMediaController.findById);
router.put("/:identifier", socialMediaController.put);
router.delete("/:identifier", socialMediaController.delete);

module.exports = router;