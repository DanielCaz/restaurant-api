const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    cost: req.body.cost,
    category: req.body.category,
    provider: req.body.provider,
    description: req.body.description,
    image: req.body.image,
  });

  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const removedProduct = await Product.deleteOne({
      _id: req.params.productId,
    });
    res.json(removedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:productId", async (req, res) => {
  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.productId },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          cost: req.body.cost,
          category: req.body.category,
          provider: req.body.provider,
          description: req.body.description,
          image: req.body.image,
        },
      }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
