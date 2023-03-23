require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const app = express();

const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("This is  My Es PayPal backend");
});

app.listen(PORT, async () => {
  await connect();
  console.log(`listening on .....http://localhost:${PORT}`) 
});