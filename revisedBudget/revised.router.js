const router = require ("express").Router();
const {createRevise,updateRevised,revisedBByPostId} = require ("./revised.controller");

router.post("/createRevised",createRevise);
router.put("/updateRevisedBudget/:spID",updateRevised);
router.get("/revisedByPostId/:id",revisedBByPostId);

module.exports = router;