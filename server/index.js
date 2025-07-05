import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import City from "./models/City.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Default Route (Optional)
app.get("/", (req, res) => {
  res.send("🌍 Weather App Backend Running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, // ⚠️ Important for Atlas SSL compatibility
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

// GET all saved cities
app.get("/api/cities", async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

// Save a new city
app.post("/api/cities", async (req, res) => {
  const { name } = req.body;
  try {
    const exists = await City.findOne({ name });
    if (exists) {
      return res.status(400).json({ error: "City already saved" });
    }
    const newCity = new City({ name });
    await newCity.save();
    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({ error: "Failed to save city" });
  }
});

// Delete a saved city
app.delete("/api/cities/:name", async (req, res) => {
  try {
    await City.deleteOne({ name: req.params.name });
    res.json({ message: "City deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete city" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
