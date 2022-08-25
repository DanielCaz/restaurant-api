const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:categoryId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    res.json(category);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const category = new Category({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
  });

  try {
    const savedCategory = await category.save();
    res.json(savedCategory);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:categoryId", async (req, res) => {
  try {
    const removedCategory = await Category.deleteOne({
      _id: req.params.categoryId,
    });
    res.json(removedCategory);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:categoryId", async (req, res) => {
  try {
    const updatedCategory = await Category.updateOne(
      { _id: req.params.categoryId },
      { $set: { name: req.body.name } }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
