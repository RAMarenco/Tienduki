const express = require("express");
const router = express.Router();

const imageController = require("../../controllers/image.controllers");

router.post("/", imageController.create);
router.get("/", imageController.findAll);
router.get("/:identifier", imageController.findById);
router.put("/:identifier", imageController.put);
router.delete("/:identifier", imageController.delete);

module.exports = router;