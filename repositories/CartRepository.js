const Repository = require("./Repository");

class CartRepository extends Repository {}

module.exports = new CartRepository("carts.json");
