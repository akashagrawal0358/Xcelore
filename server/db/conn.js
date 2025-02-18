const mongoose = require('mongoose');
require('dotenv').config();

const dbconn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected...");
  } catch (error) {
    console.error("Error connecting to the database", error.message);
  }
};

module.exports = dbconn;
