const express = require("express");
const { Document } = require("../models");

const router = express.Router();

router.post("/save", async (req, res) => {
    const { content } = req.body;
    const newVersion = await Document.create({ content });
    res.json(newVersion);
});

router.get("/history", async (req, res) => {
    const history = await Document.findAll();
    res.json(history);
});

module.exports = router;
