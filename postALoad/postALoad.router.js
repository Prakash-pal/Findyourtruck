const router = require("express").Router();

const {postALoad,loadDetailsByUserId,loadDetailsByLoadID,updatePostDetails,allPostDetails,allPostDtbypCity,allPostDtbydCity,allPostDtbyTkType,allPostDtbypDate,postByPickCCount,
    postByDropCCount,postByTruckTypeCount,postByPdateCount}= require("./postALoad.controller");

router.post("/postAload", postALoad)
router.get("/getLoadDtByUser/:id", loadDetailsByUserId)
router.get("/getLoadDtByPostId/:id", loadDetailsByLoadID)
router.put("/updatePostByPID/:id",updatePostDetails)
router.get("/getAllPosts", allPostDetails)
router.get("/postsPCity/:pCity",allPostDtbypCity)
router.get("/postsDCity/:dCity",allPostDtbydCity)
router.get("/postsTkType/:tkType",allPostDtbyTkType)
router.get("/postsPDate/:pkDate",allPostDtbypDate)
router.get("/pickCityCount",postByPickCCount)
router.get("/dropCityCount",postByDropCCount)
router.get("/truckTypeCount",postByTruckTypeCount)
router.get("/pickDateCount",postByPdateCount)
module.exports = router;