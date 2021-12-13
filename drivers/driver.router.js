const router = require("express").Router();

const {createDriver,updateDriverDetails,getDriverDetails,getAllDrivers} = require("./driver.controller");

router.post("/addDriver", createDriver);
router.patch("/:id", updateDriverDetails);
router.get("/:id", getDriverDetails);
router.get("/get", getAllDrivers);


module.exports = router;