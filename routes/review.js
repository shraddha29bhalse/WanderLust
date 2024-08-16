const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn,isAuthor}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js");


// reviews: post route
router.post("/",isLoggedIn ,validateReview, wrapAsync(reviewController.reviewPost));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn,isAuthor,wrapAsync(reviewController.destroy));

module.exports = router;