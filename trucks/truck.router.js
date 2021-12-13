const truckRouter = require ("express").Router();

const{addTruck,getAllTruckDetails,getTruckDetails,updateTrcukDetails,getTruckDetailsByUDID }=require("./truck.controller");
truckRouter.post("/addtruck", addTruck)
truckRouter.patch("/:id", updateTrcukDetails)
truckRouter.get("/:id", getTruckDetails)
truckRouter.get("/get", getAllTruckDetails)
//truckRouter.get("/:id", getTruckDetailsByUDID)
module.exports = truckRouter;