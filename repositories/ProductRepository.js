const Repository = require("./Repository");

class ProductRepository extends Repository {}

module.exports = new ProductRepository("products.json");
