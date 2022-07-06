const truckRouter = require ("express").Router();
const upload = require('../config/upload');

const{addTruck,getAllTruckDetails,getTruckDetails,updateTrcukDetails,getTruckDetailsByUDID, uploadRCAndInsurence,deleteTruck }=require("./truck.controller");
truckRouter.post("/addtruck", addTruck)
truckRouter.get("/get", getAllTruckDetails)
truckRouter.put("/:id", updateTrcukDetails)
truckRouter.get("/:id", getTruckDetails)
truckRouter.get("/truckbyuserID/:id", getTruckDetailsByUDID)
truckRouter.put("/uploadRcbooknInsurence/:id", upload.fields([{name: 'rc', maxCount: 1},{name: 'insurence', maxCount: 1}]),  uploadRCAndInsurence)
truckRouter.delete("/deleteTruck/:id",deleteTruck)


module.exports = truckRouter;