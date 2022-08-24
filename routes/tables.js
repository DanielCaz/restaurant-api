const express = require("express");
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
    _id: req.body._id,
    name: req.body.name,
    description: req.body.description,
    capacity: req.body.capacity,
    tables: req.body.tables,
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
    const removedTable = await Table.remove({ _id: req.params.tableId });
    res.json(removedTable);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:tableId", async (req, res) => {
  try {
    const updatedTable = await Table.updateOne(
      { _id: req.params.tableId },
      { $set: { name: req.body.name } }
    );
    res.json(updatedTable);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
