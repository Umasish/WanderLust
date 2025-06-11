const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
let {savedUrl} = require("../middleware.js")

const userController = require("../controllers/users.js");

router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signUp));



router.route("/login")
    .get(userController.renderLoginfrom)
    .post(
    savedUrl,
    passport.authenticate("local",
        {failureRedirect:"/login",
        failureFlash:true
    }),
    userController.login
);



//logout
router.get("/logout",userController.logout)

module.exports = router;