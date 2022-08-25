const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Provider = require("../models/Provider");

router.get("/", async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:providerId", async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.providerId);
    res.json(provider);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const provider = new Provider({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    rfc: req.body.rfc,
    phone: req.body.phone,
    email: req.body.email,
  });

  try {
    const savedProvider = await provider.save();
    res.json(savedProvider);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:providerId", async (req, res) => {
  try {
    const removedProvider = await Provider.deleteOne({
      _id: req.params.providerId,
    });
    res.json(removedProvider);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:providerId", async (req, res) => {
  try {
    const updatedProvider = await Provider.updateOne(
      { _id: req.params.providerId },
      { $set: { name: req.body.name } }
    );
    res.json(updatedProvider);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
