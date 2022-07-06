const router =  require("express").Router();
const {getBankDt} = require("./bankLite.controller");

router.get("/bankDetails/:userID/:accNo/:ifsc",getBankDt);

module.exports = router
