const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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


router.post("/login", (req, res, next) => {
   UserModel.findOne({ email: req.body.email })
   .then(user => {
        if(!user){
            return res.status(401).json({
                message: "Auth Failed"
            });
        }
        
        return bcrypt.compare(req.body.password, user.password);
   })
   .then(result => {
        if(!result){
            return res.status(401).json({
                message: "Auth failed"
            })
        }
        const token = jwt.sign(
            {
                email: user.email, userId: user._id
            }, 'secreat_token', {expiresIn: "1h"}
        );

        res.status(200).json({
            token: token
        })
   })
   .catch(err => {
        return res.status(401).json({
            message: "Auth failed"
        })
   })
});

module.exports = router;