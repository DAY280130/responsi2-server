const db = require("../models");
const brcypt = require("bcrypt");
const Account = db.accounts;

exports.create = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).send({
        create_status: "failed",
        message: "input is not enough",
      });
    }

    oldAcc = await Account.find({ username });
    if (oldAcc) {
      return res.status(400).send({
        create_status: "failed",
        message: "account already exists",
      });
    }

    encPass = await brcypt.hash(password, 10);
    await Account.create({
      username,
      password: encPass,
    });
    return res.status(200).send({
      create_status: "success",
      message: "account created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      create_status: "failed",
      message: "internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send({
        login_status: "failed",
        message: "input is not enough",
      });
    }

    const account = await Account.find({ username });
    if (!account) {
      return res.status(400).send({
        login_status: "failed",
        message: "username and/or password are wrong",
      });
    }

    const isMatch = await brcypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).send({
        login_status: "failed",
        message: "username and/or password are wrong",
      });
    }

    const token = await brcypt.hash(account.username + Date.now(), 10);
    return res.status(200).send({
      login_status: "success",
      message: "login information verified",
      token,
    });
  } catch (error) {
    return res.status(500).send({
      login_status: "failed",
      message: "internal server error",
    });
  }
};

exports.method = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).send({
      method_status: "failed",
      message: "internal server error",
    });
  }
};
