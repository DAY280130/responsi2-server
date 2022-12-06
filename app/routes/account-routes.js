module.exports = (app) => {
  const accounts = require("../controllers/account-controller");
  const router = require("express").Router();

  router.post("/add", accounts.create);
  router.post("/login", accounts.login);

  // Custom url (endpoint)
  app.use("/api/accounts", router);
};
