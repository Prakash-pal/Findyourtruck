const router =  require("express").Router();
const {getAadhaarkDt} = require("./aadhaar.controller");

router.get("/aadhaarDetails/:userID/:aadNo",getAadhaarkDt);

module.exports = router
