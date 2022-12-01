const express = require("express");
const router = express.Router();

const rolController = require("../../controllers/rol.controllers");

router.post("/", rolController.create);
router.get("/", rolController.findAll);
router.get("/:identifier", rolController.findById);
router.put("/:identifier", rolController.put);
router.delete("/:identifier", rolController.delete);

module.exports = router;