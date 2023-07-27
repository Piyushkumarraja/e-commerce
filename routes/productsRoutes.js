const express = require("express");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
  getProductByID,
  searchProduct
} = require("../controllers/product.js");

const router = express.Router();

// Create a Product
router.post("/",createProduct);

// Delete a Product
router.delete("/:id", deleteProduct);

// Update a Product
router.put("/:id", updateProduct);

// get all Product
router.get("/", getAllProduct);

// get specific Product
router.get("/:id", getProductByID);

//serach product by name , description, variants names
router.get("/search", searchProduct);

module.exports = router;