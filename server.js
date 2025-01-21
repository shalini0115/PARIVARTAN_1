const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/questions", async (req, res) => {
  try {
    const prompt = `
Generate 10 multiple-choice questions about water conservation with the following format:
[
  {
    "question": "What is the primary source of groundwater?",
    "options": ["Rainwater", "Rivers", "Lakes", "Oceans"],
    "correct": "Rainwater"
  },
  ...
]
Only return valid JSON.`;

    const response = await axios.post(
      "https://api.cohere.ai/generate",
      {
        model: "command-xlarge-nightly",
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const generatedText = response.data.generations[0].text.trim();

    // Parse the generated text into JSON
    let questions;
    try {
      questions = JSON.parse(generatedText);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      res.status(500).json({ error: "Failed to parse questions." });
      return;
    }

    res.json({ questions });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch questions." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
