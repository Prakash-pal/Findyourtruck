const {param} = require("./sp.router");

const {postABid,bidDTByUserID,bidDTBySPID,updateBidDt,bidDTByPostID,bidDetailsWithLoaddt} = require("./sp.service");

module.exports = {
    postBid :(req, res)=>{
        const body = req.body;
        postABid(body,(err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json(
                    {
                        fatal: 0,
                        error: "Database connection error CODE: 500"

                     });
            }else if(results){
                return res.status(200).json(
                    {
                        Success: 1,
                        Message: 'bid created Successfully',
                        data:body

                    });

            }

        });


    },
    bidDetailsByUserId:(req, res) =>{
        const id = req.params.id;
        console.log('checking loadDetailsByUserId input', id)
        bidDTByUserID(id, (err, results) => {
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
                    Message:'Successfully fetched Bid details by user id',
                    data:results
                });
            }     
        });
    },
    bidDetailsBySPID:(req, res) =>{
        const id = req.params.id;
        console.log('checking bidDetailsBySPID input', id)
        bidDTBySPID(id, (err, results) => {
            const [obj] =results
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
                    Message:'Successfully fetched Bid details by Bid id',
                    data:obj
                });
            }     
        });
    },
    updateBidDetails:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
        console.log('checking updated updateBidDetails input', body)
        updateBidDt(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated Bid details = ${id}`,
                    data:results
                });
            }         
        });
    },

    bidDetailsByPostID:(req, res) =>{
        const id = req.params.id;
        console.log('checking bidDetailsBySPID input', id)
        bidDTByPostID(id, (err, results) => {
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
                    Message:'Successfully fetched Bid details by Post ID',
                    data:results
                });
            }     
        });
    },

    bidDetailsByPostBided:(req, res) =>{
        const id = req.params.userID;
        bidDetailsWithLoaddt(id, (err, results) => {
            // const [obj]=results;
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
                console.log("Checking bids by responded",results);
                return res.status(200).json({
                    
                    Success:1,
                    Message:'Successfully fetched',
                    data:results
                });
            }     
        });
    },

}