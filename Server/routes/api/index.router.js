const express = require("express");
const router = express.Router();

//importar todos los enrutadores
const usersRouter = require("./users.router");
const rolRouter = require("./rol.router");
const socialRouter = require("./social.router");
const socialMediaRouter = require("./socialMedia.router")
const tokenRouter = require("./token.router");
const imageRouter = require("./image.router");
const imageTypeRouter = require("./imageType.router");
const storeCategorieRouter = require("./storeCategorie.router");
const storeCategoryRouter = require("./storeCategory.router");
const storeRatingRouter = require("./storeRating.router");
const productImageRouter = require("./productImage.router");
const activityRoutter= require("./activity.router");
const clientActivityRouter = require("./clientActivity.router");
const cartRouter = require("./cart.router");
const productCollectionRouter = require("./productCollection.router");
const storeProductRouter = require("./storeProduct.router");
const clientWishListRouter = require("./clientWishList.router");
const orderRouter = require("./order.router");
const orderStateRouter = require("./orderState.router");
const orderDetailRouter = require("./orderDetail.router");
const authRouter = require("./auth.router");

const pruebaRouter = require("./imagePueba.router");

//definir las rutas
router.use("/user", usersRouter);
router.use("/rol", rolRouter);
router.use("/social", socialRouter);
router.use("/socialMedia", socialMediaRouter);
router.use("/token", tokenRouter);
router.use("/image", imageRouter);
router.use("/imageType", imageTypeRouter);
router.use("/storeCategorie", storeCategorieRouter);
router.use("/storeCategory", storeCategoryRouter);
router.use("/storeRating", storeRatingRouter);
router.use("/productImage", productImageRouter);
router.use("/activity", activityRoutter);
router.use("/clientActivity", clientActivityRouter);
router.use("/cart", cartRouter);
router.use("/productCollection", productCollectionRouter);
router.use("/storeProduct", storeProductRouter);
router.use("/clientWishList", clientWishListRouter);
router.use("/order", orderRouter);
router.use("/orderState", orderStateRouter);
router.use("/orderDetail", orderDetailRouter);
router.use("/auth", authRouter);

router.use("/prueba", pruebaRouter);
module.exports = router;