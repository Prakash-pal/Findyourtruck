const router = require("express").Router();

const {getTruckowners, getTruckownersByUserId, updateUserDetails, deleteUserDetails, 
    updateTruckownersByCompanyDetails, updateBankDetails, updateDriverDetails, 
    updateTruckDetails, getTruckOwnerDetailsByUserId, getAllLoadBids, getAllLoadBidsByLoadId, getAllBidRespondLoadId} = require("./admin.controller");
router.get("/users/userType/u/:userType", getTruckowners)
router.get("/truckownersByUserId/:id",getTruckownersByUserId)
router.put("/truckownersByUserId/:id", updateUserDetails)
router.delete("/truckownersByUserId/:id", deleteUserDetails)

router.put("/truckowners/companyDetails/:id",updateTruckownersByCompanyDetails)
router.put("/truckowners/bankDetails",updateBankDetails)
router.put("/truckowners/driverDetails/dl",updateDriverDetails)
router.put("/truckowners/TruckDetails/td/td",updateTruckDetails)
router.get("/truckOwnerDetails/dl/:id",getTruckOwnerDetailsByUserId)
router.get("/loadBids/0/1/2/3",getAllLoadBids)
router.get("/loadBids/0/1/2/3/:id",getAllLoadBidsByLoadId)
router.get("/loadBids/0/1/2/3/4/5/:id",getAllBidRespondLoadId)



module.exports = router;
