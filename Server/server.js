const express = require("express");
const cors = require("cors");

const app = express();
const weatherRoutes = require("./Routes/weather");
const twitterRoutes = require("./Routes/Twitter");

require("dotenv").config();

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON requests

// Sample API route
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.use("/api/weather", weatherRoutes);

app.use("/api/twitter", twitterRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
