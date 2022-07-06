const router = require("express").Router();

const {addPreLocation,getPrefLocation,deletPrefLocation} = require("./prefLocation.controller");

router.post("/addPrefLocation",addPreLocation);
router.get("/userPrefLocations/:id",getPrefLocation);
router.delete("/detelLocation/:id",deletPrefLocation);
module.exports = router;