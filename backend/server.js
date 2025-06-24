const express = require("express");
const cors = require("cors"); // ✅ Added

const app = express();
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");
const db = require("./db");

app.use(express.json());
app.use(cors()); // ✅ Added

// Base route
app.get("/", (req, res) => {
  res.send("✅ API is running and connected to DB");
});

// API routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
