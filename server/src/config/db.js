require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8001;

async function connect() {
  mongoose.set("strictQuery", false);
  return mongoose.connect(process.env.DB_URL);
}

module.exports = connect;