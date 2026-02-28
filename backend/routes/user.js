const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require('../models/user'); // relative path to user.js
const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hashedData) => {
        const user = new UserModel({
            email: req.body.email,
            password: hashedData
        });

        user.save()
        .then((result) => {
            res.status(201).json({
                message: "User created successfully !!",
                result: result
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
    });
});

module.exports = router;