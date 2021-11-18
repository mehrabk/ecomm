const { validationResult } = require("express-validator");
module.exports = {
  handleError(templateFunc, dataCB) {
    let counter = 0;
    let timeoutId;
    return async (req, res, next) => {
      counter++;
      console.log(counter);
      if (counter >= 5) {
        console.log("Blocked Please Try Again After 5 Min!");
        timeoutId = setTimeout(() => {
          counter = 0;
        }, 5000);
        return res.send("Blocked");
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let data = {};
        if (dataCB) {
          data = await dataCB(req);
        }
        // inja dakhele ...data nokte dare ke data = {product: {}} then=> ...data = product
        return res.send(templateFunc({ errors, ...data }));
      }
      next();
    };
  },
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/signin");
    }
    next();
  },
};
