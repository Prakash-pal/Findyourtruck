const router = require("express").Router();

const {createCharges,getChargesDetails,updateChargesDetails} = require("./admin.controller");

router.post("/addCharges",createCharges);
router.get("/getFees",getChargesDetails);
router.put("/updateCharges/:id",updateChargesDetails);

module.exports = router;