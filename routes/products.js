const express = require("express");

const productRepository = require("../repositories/ProductRepository");
const productsListTemplate = require("../view/products/index");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productRepository.getAll();
  res.send(productsListTemplate({ products }));
});

module.exports = router;
