const Product = require("../models/Products.js");
const Variant = require("../models/Variants.js");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const productData = req.body;
      const variantsData = productData.variants || [];
      delete productData.variants;
  
      const product = await Product.create(productData);

      // Add variants to the product if provided
      for (const variantData of variantsData) {
        const variant = new Variant(variantData);
        product.variants.push(variant);
      }

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create the product.' });
    }
  },
  
  // Retrieve all products
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve products.' });
    }
  },

  searchProduct: async (req, res) => {
    try {
      console.log("piyush");
      const searchQuery = req.query.q;
      console.log(searchQuery);
      if (!searchQuery) {
        return res.status(400).json({ error: 'Search query is missing.' });
      }
  
      const searchRegex = new RegExp(searchQuery, 'i');
      console.log(searchRegex);
      const products = await Product.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { 'variants.name': searchRegex },
        ],
      });
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search products.' });
    }
  },
  
  // Retrieve a product by ID
  getProductByID: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the product.' });
    }
  },
  
  // Update a product and its variants by ID
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const productData = req.body;

      const existingProduct = await Product.findById(productId);

      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found.' });
      }

      // Update non-variant fields of the product (e.g., name, description, price)
      existingProduct.name = productData.name || existingProduct.name;
      existingProduct.description = productData.description || existingProduct.description;
      existingProduct.price = productData.price || existingProduct.price;

      // Update or add new variants to the product
      if (productData.variants) {
        for (const variantData of productData.variants) {
          if (!variantData._id) {
            // Add new variant
            const newVariant = new Variant(variantData);
            existingProduct.variants.push(newVariant);
          } else {
            // Update existing variant
            const existingVariant = existingProduct.variants.id(variantData._id);
            if (existingVariant) {
              existingVariant.name = variantData.name;
              existingVariant.sku = variantData.sku;
              existingVariant.additionalCost = variantData.additionalCost;
              existingVariant.stockCount = variantData.stockCount;
            }
          }
        }
      }

      // Save the updated product
      await existingProduct.save();

      res.json(existingProduct);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update the product.' });
    }
  },
  
  // Delete a product and its variants by ID
  deleteProduct:  async (req, res) => {
    try {
      const productId = req.params.id;
      await Product.findByIdAndDelete(productId);
      await Variant.deleteMany({ product: productId });
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete the product.' });
    }
  },

}