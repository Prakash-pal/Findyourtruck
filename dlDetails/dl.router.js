const router =  require("express").Router();
const {getDLDetails} = require("./dl.controller");

router.get("/dlDt/:suerID/:dlNo/:dob",getDLDetails);

module.exports = router
