const express = require("express");

const cartRepository = require("../repositories/CartRepository");
const productRepository = require("../repositories/ProductRepository");
const cartShowTemplate = require("../view/carts/show");

const router = express.Router();

router.post("/cart/products", async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartRepository.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartRepository.getOne(req.session.cartId);
  }
  const existingItem = cart.items.find((item) => item.id === req.body.productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  // this line have good point of update object with Object.assign(target, source)
  await cartRepository.updateRecord(cart.id, { items: cart.items });

  res.redirect("/cart");
});

router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    res.redirect("/");
  } else {
    const cart = await cartRepository.getOne(req.session.cartId);
    const items = await Promise.all(
      cart.items.map(async (item) => {
        const product = await productRepository.getOne(item.id);
        return {
          id: item.id,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
        };
      })
    );
    res.send(cartShowTemplate({ items }));
  }
});

router.post("/cart/products/delete", async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartRepository.getOne(req.session.cartId);
  const items = cart.items.filter((item) => item.id !== itemId);
  await cartRepository.updateRecord(req.session.cartId, { items });
  res.redirect("/cart");
});

module.exports = router;

// cart = {
//   id: 12334324,
//   items: [
//     { id: 2, quantity: 123 },
//     { id: 2, quantity: 123 },
//     { id: 2, quantity: 123 },
//   ],
// };
