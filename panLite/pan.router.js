const router = require("express").Router();
const {createPanLite, getPanDetails} = require("./pan.controller");

router.post("/addPan", createPanLite)
router.get("/panDt/:userId/:panNum", getPanDetails);


module.exports = router;