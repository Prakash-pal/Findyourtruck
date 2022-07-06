const bankRouter = require ("express").Router();
const upload = require ('../config/upload');

const {createBankAcc,updateBankDetails,allBankDetails,bankDetailsByUser,getBankDetailsBKId,uploadCancelCheque, updateBankDetailsByBkId,deleteBankDt} = require("./bank.controller");

bankRouter.post("/createBkAcc", createBankAcc);
bankRouter.get("/getAll",allBankDetails);
bankRouter.put("/:id", updateBankDetails);
bankRouter.get("/getBkByUserId/:id", bankDetailsByUser);
bankRouter.get("/getBkByBkId/:id",getBankDetailsBKId);
bankRouter.put("/updateBkByBkId/:id",updateBankDetailsByBkId);
bankRouter.put("/uploadCancelledCheque/:id",upload.fields([{name: 'cheque', maxCount: 1}]), uploadCancelCheque);
bankRouter.delete("/deleteBank/:id",deleteBankDt);
module.exports = bankRouter;