const router = require("express").Router();

const {postBid,bidDetailsByUserId,bidDetailsBySPID,updateBidDetails,bidDetailsByPostID,bidDetailsByPostBided} = require("./sp.controller");

router.post("/bidapost",postBid)
router.get("/getBidDtByUserId/:id",bidDetailsByUserId)
router.get("/bidDtByBidId/:id",bidDetailsBySPID)
router.put("/updateBidByBID/:id",updateBidDetails)
router.get("/getBidDtByPostId/:id", bidDetailsByPostID)
router.get("/getLoadpostsByBided/:userID", bidDetailsByPostBided)

module.exports = router;