const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect to MongoDB Cluster through Mongos Router
const MONGO_URI =
  "mongodb://localhost:27017/netflix?readPreference=primaryPreferred";
mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB Sharded Cluster"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Define Mongoose Schema and Model based dataset
const titleSchema = new mongoose.Schema({
  show_id: String,
  title: String,
  director: String,
  cast: String,
  country: String,
  date_added: String,
  release_year: Number,
  rating: String,
  duration: String,
  listed_in: String,
  description: String,
});

const Title = mongoose.model("Title", titleSchema, "titles");

// Define Read API Endpoint
app.get("/api/titles", async (req, res) => {
  const country = req.query.country || ""; // Filter by country if specified
  const query = country ? { country: new RegExp(country, "i") } : {};

  try {
    const titles = await Title.find(query);
    res.json(titles);
  } catch (err) {
    console.error("Error fetching titles:", err.message);
    res.status(500).json({ error: "An error occurred while fetching titles" });
  }
});

// Start the Express Application
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
