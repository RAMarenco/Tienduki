const express = require("express");
const router = express.Router();

const activityController = require("../../controllers/activity.controllers");

router.post("/", activityController.create);
router.delete("/:identifier", activityController.delete);

module.exports = router;