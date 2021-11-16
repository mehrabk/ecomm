const express = require("express");
const { validationResult } = require("express-validator");
const multer = require("multer");

const productRepo = require("../../repositories/ProductRepository");
const productsNewTemplate = require("../../view/admin/products/new");
const { requirePrice, requireTitle } = require("./validators");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", (req, res) => {});
router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});
router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(productsNewTemplate({ errors }));
    }
    const base64Image = req.file.buffer.toString("base64");
    const { title, price } = req.body;
    await productRepo.create({ title, price, base64Image });

    res.send("submitted");
  }
);
module.exports = router;
