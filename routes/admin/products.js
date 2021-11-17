const express = require("express");
const multer = require("multer");

const productRepo = require("../../repositories/ProductRepository");
const productsNewTemplate = require("../../view/admin/products/new");
const { requirePrice, requireTitle } = require("./validators");
const { handleError, requireAuth } = require("./middlewares");
const productIndexTemplate = require("../../view/admin/products/index");
const productEditTemplate = require("../../view/admin/products/edit");
const ProductRepository = require("../../repositories/ProductRepository");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", requireAuth, async (req, res) => {
  const products = await ProductRepository.getAll();
  res.send(productIndexTemplate({ products }));
});

router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleError(productsNewTemplate),
  async (req, res) => {
    const base64Image = req.file.buffer.toString("base64");
    const { title, price } = req.body;
    await productRepo.create({ title, price, base64Image });
    res.redirect("/admin/products");
  }
);

router.get("/admin/products/:id/edit", requireAuth, async (req, res) => {
  const product = await ProductRepository.getOne(req.params.id);
  if (!product) {
    return res.send("Product Not Found!");
  }
  res.send(productEditTemplate({ product }));
});

router.post(
  "/admin/products/:id/edit",
  // upload.single("image"),
  requireAuth,
  [requireTitle, requirePrice],
  // handleError(XXXXX),
  async (req, res) => {
    console.log(req.body);
    res.send("Done");
  }
);

module.exports = router;
