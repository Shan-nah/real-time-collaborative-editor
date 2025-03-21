const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/suggest", async (req, res) => {
    const { text } = req.body;

    const response = await openai.complete({
        engine: "text-davinci-003",
        prompt: `Improve the following text: "${text}"`,
        maxTokens: 150,
    });

    res.json({ suggestion: response.choices[0].text });
});

module.exports = router;

