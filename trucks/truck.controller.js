const {param} =require ("./truck.router");

const {createtk,getAllTK,getTKDetails,updateTKDetail,updateTKDetailByUserID} = require("./truck.service");

module.exports = {
    addTruck:(req, res) => {
        const body = req.body;
       // console.log("Connection testing...........")
       createtk(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    succss:1,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:'Truck added successfully',
                    data:body
                });
            }    
        });
    },
    getTruckDetails:(req, res) =>{
        const id = req.params.id;
        console.log('checking getDriverDetails input', id)
        getTKDetails(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:"Successfully fetched Truck details",
                    data:results
                });
            }     
        });
    },
    getTruckDetailsByUDID:(req, res) =>{
        const id = req.params.id;
        console.log('checking getDriverDetails input', id)
        updateTKDetailByUserID(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:"Successfully fetched Truck details",
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
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:`Successfully updated Truck details = ${id}`,
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
                    data: "Database connection error"
                });
            }else{
                return res.status(200).json({
                    succss: 'Successfull fetched all truck details',
                    data: results
                })
            }

        });


    }

}
