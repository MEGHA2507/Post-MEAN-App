const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect(
  "mongodb+srv://meghab:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.h4kbubm.mongodb.net/node-angular?retryWrites=true&w=majority"
)
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join("images")));

/* CORS FIX */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;