const mongoose = require('mongoose');
const UserSchema = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const device_detect = require('react-device-detect');

exports.sign_up = (req, res) => {

    const User = mongoose.users.model('User', UserSchema);

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log("error");
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            device_type: device_detect.osName,
                            browser: device_detect.browserName  //returning none for now, might be postman, check later
                        });
        
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: "User Created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.json()
        });
}

exports.login = (req, res) => {
    const User = mongoose.users.model('User', UserSchema);

    User.find( {email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authorization Failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Authorization Failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: 'Authorization Successful',
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'Authorization Failed'
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}