var express = require("express");
var {body, validationResult} = require("express-validator/check");
var sanitizeBody = require("express-validator/filter");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken"); 
var User = require("../models/users");

exports.user_signup_get = function(req,res,next){
    res.render('user_signup_form'); 
}
exports.user_signup_post = [
    //validate fields
    body("username").isLength({min:1}).trim().withMessage("username must be specified")
        .isAlphanumeric().withMessage("username is not alpha numeric"),
    
    body("email").isEmail().withMessage("Please enter valid email"),

    body("password").isLength({min:6}).withMessage("Password must have atleast 6 characters"),

    //body("createdAt", 'Invalid date of creation').optional({ checkFalsy: true }).isISO8601(),
    //sanitize fields
    sanitizeBody("username").escape(),
    sanitizeBody("email").escape(),
    sanitizeBody("password").escape(),

    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('user_signup_form');
            return;
        }
        else if(User.findOne({username:req.body.username})){
            res.render()
        }
        var user = new User({
            username:req.body.username,
            password:
        })

    }
]
