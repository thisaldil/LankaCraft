const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

router.post("/create", productController.createProduct);
router.get("/featured", productController.getFeaturedProducts);
router.get("/filter", productController.getByCategory);
router.get("/", productController.getAllProducts);
router.get("/discounted", productController.getDiscountedProducts);

router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
