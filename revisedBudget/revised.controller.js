const {param} = require("./revised.router");

const {createRevisedB,updateRevisedB,revisedBidByPostId} = require("./revised.service");

module.exports = {

    createRevise: (req, res) =>{
        const body = req.body;
        createRevisedB( body, (err, results)=>{
            if(err){
                return res.status(500).json({
                    fatal: 0,
                    error: "Database is not conected CODE: 500"
                });
            }else if (results){
                return res.status(200).json({
                    Success: 1,
                    Message: 'Revised created successfully',
                    data:body
                });
            }

        });

    },
    
    updateRevised:(req, res) =>{
        const body = req.body;
        const spID = req.params.spID;
        console.log('checking updated updateRevisedB By post spID input', body)
        updateRevisedB(spID,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated revised budget`,
                    data:results
                });
            }         
        });
    },

    revisedBByPostId:(req, res) =>{
        const id = req.params.id;
        console.log('checking revisedBByPostId input', id)
        revisedBidByPostId(id, (err, results) => {
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
                    Message: 'Successfully fetched load details',
                    data:results
                });
            }     
        });
    },

}