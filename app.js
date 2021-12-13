require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require('./users/user.route');
const truckRouter = require('./trucks/truck.router');
const driverRouter = require('./drivers/driver.router');
const bankRouter = require('./bankDetails/bank.router');


app.use(express.json());
app.use("/user", userRouter);
app.use("/truck", truckRouter);
app.use("/driver", driverRouter);
app.use("/bank", bankRouter);


const port = process.env.APP_PORT || 4000;

console.log("Server is up and running on PORT :",process.env.DB_HOST);

app.listen(port,()=>{
    console.log("Server running on Port 5000")
})

