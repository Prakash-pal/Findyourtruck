const bankRouter = require ("express").Router();

const {createBankAcc, getBankDetailsByID} = require("./bank.controller");

bankRouter.post("/createAccount", createBankAcc);
bankRouter.get("/:id", getBankDetailsByID);

module.exports = bankRouter;

