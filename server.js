const express = require("express");
const connectDB = require("./config/db");
const faqRoutes = require("./routes/faqRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api", faqRoutes);

const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
