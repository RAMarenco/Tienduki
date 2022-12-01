const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user.controllers");

// Crear usuario
router.post("/", userController.create);

// Eliminar usuario
router.delete("/:identifier", userController.delete);

// Obtener uno o todos los usuarios
router.get("/:identifier", userController.findById);
router.get("/", userController.findAll);

// Editar datos del usuario
router.put("/:identifier", userController.put);

module.exports = router;