const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

router.post("/create", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/filter", productController.getByCategory);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
