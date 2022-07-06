const router = require("express").Router();

const upload = require('../config/upload');

const {createDriver,updateDriverDetails,getDriverDetails,allDriversDetails, getDriverDetailsByUDID,getDDetailsByTruckID,uploadDLAndSelfie,adminDeleted,deleteDriverDetails,getDriverRole} = require("./driver.controller");

router.post("/addDriver", createDriver);
router.get("/userId/:id", getDriverDetailsByUDID);
router.get("/get", allDriversDetails);
router.put("/udateDr/:id", updateDriverDetails);
router.get("/driverId/:id", getDriverDetails);
router.put("/uploadDrDlAndSelfie/:id",upload.fields([{name: 'dl', maxCount: 1},{name: 'selfie', maxCount: 1}]), uploadDLAndSelfie);
router.get("/driverDtByTkID/:id", getDDetailsByTruckID);
router.put("/deleteFlag/:id",adminDeleted);
router.delete("/deleteDriver/:driverId",deleteDriverDetails);
router.get("/isDriverExist/:id",getDriverRole);
module.exports = router;