const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 5000;

app.get("/api/following", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.twitter.com/2/users/:id/following",
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from Twitter API", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
