const express = require("express");
const { validationResult, check } = require("express-validator");

const userRepository = require("../../repositories/UserRepository");

const signupTemplate = require("../../view/admin/auth/signup");
const signinTemplate = require("../../view/admin/auth/signin");

const {
  requireEmail,
  requirePassword,
  requirePasswordConfirm,
  requireEmailExist,
  requireValidPasswordForUser,
} = require("../admin/validators");
const { handleError } = require("./middlewares");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirm],
  handleError(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await userRepository.create({ email, password });
    req.session.userId = user.id;
    res.redirect("/admin/products");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("you are Logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  "/signin",
  [requireEmailExist, requireValidPasswordForUser],
  handleError(signinTemplate),
  async (req, res) => {
    const { email } = req.body;
    const user = await userRepository.getOneBy({ email });
    req.session.userId = user.id;
    res.redirect("/admin/products");
  }
);

module.exports = router;

// req.session is an object that cookie-session middleware created for us
// we add some information into this object and when we send them, cookie-session middleware
// ..will automatic encrypt this information with keys that provided and set to response session
// ..eventually save into browser and after that every request we have cookie in request
// ..and cookie-session handle it again and authenticate and provide req.session object(intercept request)
// if user manipulate this session, authentication will reject and session from user`s browser will remove.
