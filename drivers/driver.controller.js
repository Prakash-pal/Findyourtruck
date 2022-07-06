const {param} = require("./driver.router");

const {createDr,getDrDetails,updateDrDetail,allDrsDt,getDrDetailByUserID,getDrDetailByTruck,uploadDLAndSelfie,deletedByAdmin,deleteDriver,isDriverExist} = require("./driver.service");

module.exports = {
    createDriver :(req, res)=> {
        const body = req.body;
        createDr(body, (err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json(
                    {
                        fatal: 0,
                        error: "Database connection error CODE: 500"
                    });

            }else{
                return res.status(200).json({
                    Success:1,
                    Message:'Driver created successfully',
                    data:body
                });
            }  


        });
    },

    updateDriverDetails:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
        console.log('checking updated DriverDetails input', body)
        updateDrDetail(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated driver details = ${id}`,
                    data:results
                });
            }         
        });
    },

    allDriversDetails:(req, res) =>{
        allDrsDt((err, results) => {
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
                    Message: 'Successfully fetched all Driver details',
                    data:results
                });
            }    
        });
    },
    getDriverDetails:(req, res) =>{
        const id = req.params.id;
        console.log('checking getDriverDetails input', id)
        getDrDetails(id, (err, results) => {
            const [obj] = results;
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
                    Message:'Successfully fetched Driver details',
                    data:obj
                });
            }     
        });
    },
    getDriverDetailsByUDID:(req, res) =>{
        const id = req.params.id;
        console.log('checking getDriverDetails input', id)
        getDrDetailByUserID(id, (err, results) => {
            
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
                    Message:'Successfully Driver details by User ID',
                    data:results
                });
            }     
        });
    },
    getDDetailsByTruckID:(req, res) =>{
        const id = req.params.id;
        console.log('checking getDDetailsByTruckID input', id)
        getDrDetailByTruck(id, (err, results) => {
            
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
                    Message: 'Successfully Driver details by Truck ID',
                    data:results
                });
            }     
        });
    },
    uploadDLAndSelfie:(req, res) =>{
        const id = req.params.id;
        uploadDLAndSelfie(req.files, id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated driver Images details = ${id}`,
                    data:results
                });
            }         
        });
    },

    adminDeleted:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
        console.log('checking updated Admin Deleted input', body)
        deletedByAdmin(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:`Delete flag was Successfully updated driver details = ${id}`,
                    data:results
                });
            }         
        });
    },
    deleteDriverDetails:(req, res) =>{
        const id = req.params.driverId;
        console.log('checking deleteDriverDetails input', id)
        deleteDriver(id, (err, results) => {
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

    getDriverRole:(req, res) =>{
        const id = req.params.id;
        console.log('checking driver role input', id)
        isDriverExist(id, (err, results) => {
            
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
                        Message: 'Number does not exist in driver bank',
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message: 'Number already there in driver bank',
        
                });

            
            }     
        });
    },

}