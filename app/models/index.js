const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

// models list
db.accounts = require("./account-model")(mongoose);
db.contacts = require("./contact-model")(mongoose);

module.exports = db;
