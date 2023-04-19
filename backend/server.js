'use strict';

const express = require("express");
// App
const app = express();
const cors = require("cors");

// Constants
const PORT = 5000;
const HOST = '0.0.0.0';

app.use(cors());

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!")
})

app.listen(PORT, HOST, () => {
  console.log(`Howler is running on http://${HOST}:${PORT}`);
});