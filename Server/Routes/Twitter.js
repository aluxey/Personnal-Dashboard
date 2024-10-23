const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/timeline", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.twitter.com/2/users/:id/tweets",
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Twitter data" });
  }
});

module.exports = router;
