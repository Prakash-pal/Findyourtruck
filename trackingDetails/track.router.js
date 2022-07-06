const router = require("express").Router();

const {postLoadTrackingId,trackingDetailsBySpid,trackingDetailsByLpid,allTrackingIDsDetails,updateTrackingDetailsTkId,trackingDtbyTkid,trackingHistoryByLpid,trackingHistoryBySPid} = require("./track.controller");

router.post("/trackingId",postLoadTrackingId);
router.get("/spTrackingDt/:spID",trackingDetailsBySpid);
router.get("/lpTrackingDt/:lpID",trackingDetailsByLpid);
router.get("/allTrackingIds",allTrackingIDsDetails);
router.put("/updateTrackID/:trackID",updateTrackingDetailsTkId);
router.get("/trackDtbyID/:tkid",trackingDtbyTkid);
router.get("/lpTrackHistory/:idLP",trackingHistoryByLpid);
router.get("/spTrackHistory/:idSP",trackingHistoryBySPid);

module.exports = router;