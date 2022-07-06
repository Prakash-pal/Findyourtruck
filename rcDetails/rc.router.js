const router =  require("express").Router();
const {getRcDetails} = require("./rc.controller");

router.get("/vehicleRC/:userID/:vehNo",getRcDetails);

module.exports = router
