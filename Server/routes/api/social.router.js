const express = require("express");
const router = express.Router();

const socialController = require("../../controllers/social.controllers");

router.post("/", socialController.create);
router.get("/", socialController.findAll);
router.get("/:identifier", socialController.findById);
router.put("/:identifier", socialController.put);
router.delete("/:identifier", socialController.delete);

module.exports = router;