const {param} = require("./trip.router");

const {postaTrip,tripDTByUserID,tripDTByTripID,updateTripDt,allTripsDt,deleteTripDetails,allTripDt}= require("./trip.service");

module.exports = {

    tripPosting :(req, res)=>{
        const body = req.body;
        postaTrip(body,(err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json(
                    {
                        fatal: 0,
                        error: "Database connection error CODE: 500"

                     });
            }else if (results){
                return res.status(200).json(
                    {
                        Success: 1,
                        Message: 'Trip posted successfully',
                        data:body

                    });

            }

        });


    },
    tripDetailsByUserId:(req, res) =>{
        const id = req.params.id;
        console.log('checking tripDetailsByUserId input', id)
        tripDTByUserID(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{

                // var result = results[0]
                // result.time = 4;
                if(results.length == 0 ){
                    return res.status(200).json({
                        Success:0,
                        Message:'No data found',
                    });

                }
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully fetched Trip details by user id',
                    data:results
                });
            }     
        });
    },
    tripDetailsByTripID:(req, res) =>{
        const id = req.params.id;
        console.log('checking loadDetailsByUserId input', id)
        tripDTByTripID(id, (err, results) => {
            const[obj]= results;
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
                        Message:'No data found',
                        
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully fetched trip details by Trip_id',
                    data:obj
                });
            }     
        });
    },
    updateTripDetails:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
        console.log('checking updated Trip Details input', body)
        updateTripDt(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:`Successfully updated trip details = ${id}`,
                    data:results
                });
            }         
        });
    },

    allTripDetails:(req, res) =>{
        allTripsDt((err, results) => {
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
                        Message:'No data found',
                       
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully fetched all Trips details',
                    data:results
                });
            }    
        });
    },
    deletTripDt:(req, res) =>{
        const id = req.params.id;
        console.log('checking deletTripDt input', id)
        deleteTripDetails(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully deleted Trip Details',
                });
            }     
        });
    },




}