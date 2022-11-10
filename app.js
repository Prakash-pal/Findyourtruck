require("dotenv").config();
const express = require("express");
const app = express();
let cors = require("cors");
//test
const userRouter = require('./users/user.route');
const truckRouter = require('./trucks/truck.router');
const driverRouter = require('./drivers/driver.router');
const bankRouter = require('./bankDetails/bank.router');
const companyRouter = require('./companyDetails/company.router');
const imgBucket = require("./uploadImages/image.router");
const truckType = require("./truckType/trcuckType.router");
const postALoad = require("./postALoad/postALoad.router");
const bidALoad = require("./spBidDetails/sp.router");
const userRatings = require("./ratings/ratings.router");
const userPreLocation = require("./prefLocations/prefLocation.router");
const panLite = require("./panLite/pan.router");
const dlLite = require("./dlDetails/dl.router");
const rcLite = require("./rcDetails/rc.router");
const bankLite = require("./bankLite/bankLite.router");
const aadhLite = require("./aadhaarLite/aadhaar.router");
const adminPanel = require("./admin/admin.router");
const aadhaarDt = require("./aadhaarDetails/aadhaarDt.router");
const tripDt = require("./postAtrip/trip.router");
const trackingId = require("./trackingDetails/track.router");
const revisedBudget = require("./revisedBudget/revised.router");
const adminWebPanel = require("./adminWeb/admin.route");

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/truck", truckRouter);
app.use("/driver", driverRouter);
app.use("/bank", bankRouter);
app.use("/company",companyRouter);
app.use("/imgbucket", imgBucket);
app.use("/trucktype", truckType);
app.use("/loadpost",postALoad);
app.use("/spbid",bidALoad);
app.use("/rate", userRatings);
app.use("/prefLacations", userPreLocation);
app.use("/userPan", panLite);
app.use("/userDl", dlLite);
app.use("/userRc",rcLite);
app.use("/userBankAc", bankLite);
app.use("/userAadhaar", aadhLite);
app.use("/admin",adminPanel);
app.use("/aadhaar",aadhaarDt);
app.use("/trip",tripDt);
app.use("/track",trackingId);
app.use("/revised",revisedBudget);

app.use("/adminWeb",adminWebPanel);

const port = process.env.APP_PORT || 4000;

console.log("Server is up and running on PORT :",process.env.DB_HOST);

app.listen(port,()=>{
    console.log("Server running on Port 3000")
})

