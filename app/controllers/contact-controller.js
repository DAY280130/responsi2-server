const db = require("../models");
const Contact = db.contacts;

exports.create = async (req, res) => {
  try {
    const { name, number } = req.body;
    if (!(name && number)) {
      return res.status(400).send({
        create_status: "failed",
        message: "input is not enough",
      });
    }

    const oldCont = await Contact.find({ name });
    if (oldCont) {
      return res.status(400).send({
        create_status: "failed",
        message: "contact already exists",
      });
    }

    await Contact.create({
      name,
      number,
    });
    return res.status(200).send({
      create_status: "success",
      message: "contact created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      create_status: "failed",
      message: "internal server error",
    });
  }
};

exports.read = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        read_status: "failed",
        message: "input is not enough",
      });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).send({
        read_status: "failed",
        message: "contact not found",
      });
    }

    return res.status(200).send({
      read_status: "success",
      message: "contact found",
      contact: {
        id: contact.id,
        name: contact.name,
        number: contact.number,
      },
    });
  } catch (error) {
    return res.status(500).send({
      read_status: "failed",
      message: "internal server error",
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if ((contacts = [])) {
      return res.status(404).send({
        read_status: "failed",
        message: "contacts not found",
      });
    } else {
      contacts.map((contact) => ({
        id: contact.id,
        name: contact.name,
        number: contact.number,
      }));
      return res.status(200).send({
        read_status: "success",
        message: "contacts found",
        contacts,
      });
    }
  } catch (error) {
    return res.status(500).send({
      read_status: "failed",
      message: "internal server error",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id, name, number } = req.body;
    if (!(id && name && number)) {
      return res.status(400).send({
        update_status: "failed",
        message: "input is not enough",
      });
    }

    await Contact.findByIdAndUpdate(id, {
      name,
      number,
    });
    return res.status(200).send({
      update_status: "success",
      message: "contact updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      update_status: "failed",
      message: "internal server error",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).send({
        delete_status: "failed",
        message: "input is not enough",
      });
    }

    if (!(await Contact.findById(id))) {
      return res.status(404).send({
        delete_status: "failed",
        message: "contact not found",
      });
    }

    await Contact.findByIdAndDelete(id);
    return res.status(200).send({
      delete_status: "success",
      message: "contact deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      delete_status: "failed",
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
