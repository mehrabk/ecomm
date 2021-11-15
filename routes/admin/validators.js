const { check } = require("express-validator");
const userRepository = require("../../repositories/users");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      const existingUser = await userRepository.getOneBy({ email });
      if (existingUser) {
        throw new Error("Email in use");
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),
  requirePasswordConfirm: check("passwordConfirm")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Must be between 4 and 20 characters")
    .custom((passwordConfirm, { req }) => {
      console.log("dadash velkon", req.body.passwordConfirm);
      if (passwordConfirm !== req.body.password) {
        throw new Error("password must match");
      }
      return true;
    }),
  requireEmailExist: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must Provide a Valid Email")
    .custom((email) => {
      const user = userRepository.getOneBy({ email });
      if (!user) {
        throw new Error("Email Not Found!");
      }
      return true;
    }),
  requireValidPasswordForUser: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await userRepository.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error("Email Not Found! (Password Validator Check)");
      }
      const validPassword = await userRepository.comparePassword(user.password, password);
      if (!validPassword) {
        throw new Error("Invalid Password!");
      }
      return true;
    }),
};
