const {param} =require ("./truck.router");

const {createtk,getAllTK,getTKDetails,updateTKDetail,getTruckDetailsByUDID, uploadRCnInsurence,deleteTruckDetails} = require("./truck.service");

module.exports = {
    addTruck:(req, res) => {
        const body = req.body;
       // console.log("Connection testing...........")
       createtk(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: 'Database connection error'
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:'Truck added successfully',
                    data:body
                });
            }    
        });
    },
    getTruckDetails:(req, res) =>{
        const id = req.params.id;
        console.log('checking getTruckDetails input', id)
        getTKDetails(id, (err, results) => {
            const [obj] = results;
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: 'Database connection error'
                });
            }else{
                if(results.length==0){
                    return res.status(200).json({

                        Success:0,
                        Message: 'No data found'
                        
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully getTruckDetails Truck details',
                    data:obj
                });
            }     
        });
    },
    getTruckDetailsByUDID:(req, res) =>{
        const id = req.params.id;
        console.log('checking getTruckDetailsByUDID input', id)
        getTruckDetailsByUDID(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: 'Database connection error'
                });
            }else{
                if(results.length==0){
                    return res.status(200).json({

                        Success:0,
                        Message: 'No data found'
                        
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully fetched drucks details by user_id',
                    data:results
                });
            }     
        });
    },
    updateTrcukDetails:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
        console.log('checking updated updatedTrcukDetails input', body)
        updateTKDetail(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: 'Database connection error'
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated Truck details = ${id}`,
                    data:results
                });
            }         
        });
    },
    getAllTruckDetails: (req, res) =>{
        getAllTK ((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal: 0,
                    data: 'Database connection error'
                });
            }else{
                if(results.length==0){
                    return res.status(200).json({

                        Success:0,
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success: 1,
                    Message: 'Successfull fetched all truck details',
                    data: results
                })
            }

        });


    },
    uploadRCAndInsurence:(req, res) =>{
        const id = req.params.id;
        uploadRCnInsurence(req.files, id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: 'Database connection error'
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated RC and Insurence = ${id}`,
                    data:results
                });
            }         
        });
    },

    deleteTruck:(req, res) =>{
        const id = req.params.id;
        console.log('checking deleteTruck input', id)
        deleteTruckDetails(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: 'Database connection error'
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully delete Truck Details',
                });
            }     
        });
    },

}
