const router = require("express").Router();
const {createTruckType,allTruckTypes } = require('./truckType.controller');

router.post("/createTKType",createTruckType );
router.get("/getAllTruckType", allTruckTypes);

module.exports = router;