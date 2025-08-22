const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
require("./config/db")();

// Routes
const alertRoutes = require("./routes/alertRoutes");
app.use("/api/alerts", alertRoutes);

const issueRoutes = require('./routes/issueRoutes');
app.use('/api/issues', issueRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
