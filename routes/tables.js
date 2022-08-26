const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Table = require("../models/Table");

router.get("/", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:tableId", async (req, res) => {
  try {
    const table = await Table.findById(req.params.tableId);
    res.json(table);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const table = new Table({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    capacity: req.body.capacity,
    status: req.body.status,
  });

  try {
    const savedTable = await table.save();
    res.json(savedTable);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:tableId", async (req, res) => {
  try {
    const removedTable = await Table.deleteOne({ _id: req.params.tableId });
    res.json(removedTable);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:tableId", async (req, res) => {
  try {
    const updatedTable = await Table.updateOne(
      { _id: req.params.tableId },
      {
        $set: {
          name: req.body.name,
          capacity: req.body.capacity,
          status: req.body.status,
        },
      }
    );
    res.json(updatedTable);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
