const router = require("express").Router();

const {createCompany,getCompanyDetails,updateCompanyDetails}= require("./company.controller");

router.post("/create",createCompany)
router.put("/:id", updateCompanyDetails)
router.get("/get/:id", getCompanyDetails)

module.exports =router;