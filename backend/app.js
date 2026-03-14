const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect("mongodb+srv://meghab:"+ process.env.MONGO_ATLAS_PW +"@cluster0.h4kbubm.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Connection failed!');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.get("/", (req, res) => {
  res.send("API running");
});

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;