'use strict';

const express = require("express");
// App
const app = express();
const cors = require("cors");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const likeRoutes = require("./routes/likes");

// Constants
const PORT = 5000;
const HOST = '0.0.0.0';

app.use(cors());

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!")
});

app.use("/", mainRoutes);
app.use("/api/post", postRoutes);
app.use("/api/likes", likeRoutes);

app.listen(PORT, HOST, () => {
  console.log(`MoonBloggers is running on http://${HOST}:${PORT}`);
});