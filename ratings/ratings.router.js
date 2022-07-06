const router = require ("express").Router();
const {rateUser,ratingDetailsByUserId,ratingDetailsByTransectionId,ratingDetailsRatedBy,deleteRatingByUserID} = require ("./ratings.controller");

router.post("/submitRating", rateUser);
router.get("/ratingsByUserID/:id",ratingDetailsByUserId);
router.get("/ratingsDTByTransID/:id",ratingDetailsByTransectionId);
router.get("/ratingsGivenBy/:id", ratingDetailsRatedBy);
router.delete("/deleteRtGivenBy/:id",deleteRatingByUserID);
module.exports = router;