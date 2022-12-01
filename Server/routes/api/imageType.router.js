const express = require("express");
const router = express.Router();

const imageTypeController = require("../../controllers/imageType.controllers");

router.post("/", imageTypeController.create);
router.get("/", imageTypeController.findAll);
router.get("/:identifier", imageTypeController.findById);
router.delete("/:identifier", imageTypeController.delete);
router.put("/:identifier", imageTypeController.put);

module.exports = router;