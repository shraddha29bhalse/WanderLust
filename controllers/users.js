
const User = require("../models/user.js"); // Adjust the path if needed


//signup get
module.exports.signupGet=(req, res) => {
    res.render("./users/signup.ejs"); //"./users/signup.ejs"
}

module.exports.signupPost = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) {
                req.flash("error", "Login failed");
                return res.redirect("/signup");
            }
            req.flash("success", "Welcome To WanderLust");
            res.redirect("/listings");
        });
    } catch (e) {
        console.log(e); // Log error to console for debugging
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

//login post
module.exports.loginPost=async (req, res) => {
    console.log("Login successful");
    req.flash("success", "welcome to WanderLust");
    let redirectUrl= res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};
//login get
module.exports.loginGet=(req, res) => {
    res.render("users/login.ejs");
}
//logout post
module.exports.logoutGet=(req, res, next) => {
    req.logout((error) => {
        if (error) {
            next(error);
        }
        req.flash("success", "You are logged out");
        res.redirect("/listings");
    });
};