module.exports = (app) => {
  const contacts = require("../controllers/contact-controller");
  const router = require("express").Router();

  router.post("/add", contacts.create);
  router.get("/get/:id", contacts.read);
  router.get("/getall", contacts.readAll);
  router.put("/edit", contacts.update);
  router.delete("/remove", contacts.delete);

  // Custom url (endpoint)
  app.use("/api/cont", router);
};
