const router =  require("express").Router();
const {getAadhaarDetails} = require("./aadhaarDt.controller");
router.get("/sendAadhaarOTP/:suerID/:aadNo/:request_id/:otp",getAadhaarDetails);

module.exports = router
