const Alert = require('../models/Alert');

// GET /alerts
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// POST /alerts
exports.createAlert = async (req, res) => {
  try {
    const { title, description, type, location } = req.body;

    if (!title || !description || !type || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAlert = new Alert({
      title,
      description,
      type,
      location
    });

    await newAlert.save();
    res.status(201).json(newAlert);
  } catch (error) {
    console.error("Error creating alert:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
