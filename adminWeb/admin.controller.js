
const {getTruckowners, getTruckownersByUserId, updateUserDetails, deleteUserDetails, updateTruckownersByCompanyDetails, 
    updateBankDetails, updateDriverDetails, updateTruckDetails, getTruckOwnerDetailsByUserId, getAllLoadBids, 
    getAllLoadBidsByLoadId, getAllBidRespondLoadId} = require("./admin.service");
module.exports = {
    getTruckowners:(req, res) =>{
        const userType  = req.params.userType;
        getTruckowners(userType, (err, results) => {
            // const [obj] = results;
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{

                if(results.length==0){
                    return res.status(200).json({

                        Success:0,
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully fetched all users details',
                    data:results
                });
            }    
        });
    },
    getTruckownersByUserId:(req, res) =>{
        const id  = req.params.id;
        console.log('checking getUserDetailsByPhNo input', id)
        getTruckownersByUserId(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                if(results.length==0){
                    return res.status(200).json({

                        Success:0,
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message: "Successfully fetched user details by phone Number",
                    data:results
                });
            }     
        });
    },
    updateUserDetails:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
    
        console.log('checking updated UserDetails input', body)
        if(Object.keys(body).length === 0 ){
            return res.status(500).json({
                fatal:0,
                data: "data error"
            });
        }
        updateUserDetails(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated user details = ${id}`,
                    data:results
                });
            }         
        });
    },
    deleteUserDetails:(req, res) =>{
        const id  = req.params.id;
        deleteUserDetails(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: 'Database connection error'
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully delete Driver',
                });
            }     
        });
    },
    updateTruckownersByCompanyDetails:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
    
        console.log('checking updated UserDetails input', body)
        if(Object.keys(body).length === 0 ){
            return res.status(500).json({
                fatal:0,
                data: "data error"
            });
        }
        updateTruckownersByCompanyDetails(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated user details = ${id}`,
                    data:results
                });
            }         
        });
    },
    updateBankDetails:(req, res) =>{
        var id = req.query.bankId
        console.log("id..........",id);
        const body = req.body;
        if(Object.keys(body).length === 0 ){
            return res.status(500).json({
                fatal:0,
                data: "data error"
            });
        }
        updateBankDetails(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated user details = ${id}`,
                    data:results
                });
            }         
        });
    },
    updateDriverDetails:(req, res) =>{
        var id = req.query.driverId
        console.log("id..........",id);
        const body = req.body;
        if(Object.keys(body).length === 0 ){
            return res.status(500).json({
                fatal:0,
                data: "data error"
            });
        }
        updateDriverDetails(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated user details = ${id}`,
                    data:results
                });
            }         
        });
    },
    updateTruckDetails:(req, res) =>{
        var id = req.query.truckId
        console.log("id..........",id);
        const body = req.body;
        if(Object.keys(body).length === 0 ){
            return res.status(500).json({
                fatal:0,
                data: "data error"
            });
        }
        updateTruckDetails(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated user details = ${id}`,
                    data:results
                });
            }         
        });
    },
    getTruckOwnerDetailsByUserId:(req, res) =>{
        const id  = req.params.id;
        getTruckOwnerDetailsByUserId(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                if(results.length==0){
                    return res.status(200).json({

                        Success:0,
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message: "Successfully fetched user details by phone Number",
                    data:results
                });
            }     
        });
    },
    getAllLoadBids:(req, res) =>{
        getAllLoadBids((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                if(results.length==0){
                    return res.status(200).json({

                        Success:0,
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message: "Successfully fetched user details by phone Number",
                    data:results
                });
            }     
        });
    },
    getAllLoadBidsByLoadId:(req, res) =>{
        const id  = req.params.id;
        getAllLoadBidsByLoadId(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                if(results.length==0){
                    return res.status(200).json({

                        Success:0,
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message: "Successfully fetched user details by phone Number",
                    data:results
                });
            }     
        });
    },
    getAllBidRespondLoadId:(req, res) =>{
        const id  = req.params.id;
        getAllBidRespondLoadId(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                if(results.length==0){
                    return res.status(200).json({

                        Success:0,
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message: "Successfully fetched user details by phone Number",
                    data:results
                });
            }     
        });
    },
}