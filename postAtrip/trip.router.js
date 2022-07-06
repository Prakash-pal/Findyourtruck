const router = require("express").Router();

const {tripPosting,tripDetailsByUserId,tripDetailsByTripID,updateTripDetails,deletTripDt,allTripDetails}= require("./trip.controller");
router.post("/postATrip", tripPosting)
router.get("/getTripDtByUser/:id", tripDetailsByUserId)
router.get("/getTripDtByTripId/:id", tripDetailsByTripID)
router.put("/updateTripByTripId/:id",updateTripDetails)
router.get("/getAllTrips", allTripDetails)
router.delete("/deleteTripDetails/:id", deletTripDt)
// router.delete("deleteTripDetails/:id",deletTripDt);

module.exports = router;