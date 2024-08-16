const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController= require("../controllers/users.js");

router.route("/signup")
.get(userController.signupGet)
.post( wrapAsync(userController.signupPost));

router.route("/login")
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash: true
    }), 
    userController.loginPost
)
.get(userController.loginGet);



//logout get
router.get("/logout",userController.logoutGet );

module.exports = router;