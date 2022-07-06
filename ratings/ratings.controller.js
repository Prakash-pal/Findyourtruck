const {param} = require("./ratings.router");

const {rateAUser,ratingDTByUserId,ratingDTByTsId,ratingDTByRatedById,deleteRatingDTByUserID} = require("./ratings.service");

module.exports = {

    rateUser: (req, res) =>{
        const body = req.body;
        rateAUser( body, (err, results)=>{
            if(err){
                return res.status(500).json({
                    fatal: 0,
                    error: "Database is not conected CODE: 500"
                });
            }else if (results){
                return res.status(200).json({
                    Success: 1,
                    Message: 'Rating submitted successfully',
                    data:body
                });
            }

        });

    },
    ratingDetailsByUserId:(req, res) =>{
        const id = req.params.id;
        console.log('checking ratingDetailsByUserId input', id)
        ratingDTByUserId(id, (err, results) => {
    
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
                
                var averageSum = 0;
                for(var i=0; i<results.length; i++){
                    console.log(results[i].rated_no)
                    averageSum += parseInt(results[i].rated_no);
                }
                var average = averageSum/results.length
                average =  (Math.round(average * 100) / 100).toFixed(1);
                return res.status(200).json({
                    Success:1,
                    Rating:average
                });
            }     
        });
    },
    ratingDetailsByTransectionId:(req, res) =>{
        const id = req.params.id;
        console.log('checking ratingDetailsByTransectionId input', id)
        ratingDTByTsId(id, (err, results) => {
            const[obj]=results;
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:"Successfully fetched Rating Details details by TransectionId id",
                    data:obj
                });
            }     
        });
    },
    ratingDetailsRatedBy:(req, res) =>{
        const id = req.params.id;
        console.log('checking ratingDetailsByTransectionId input', id)
        ratingDTByRatedById(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:"Successfully fetched Rating Details details by TransectionId id",
                    data:results
                });
            }     
        });
    },
    deleteRatingByUserID:(req, res) =>{
        const id = req.params.id;
        console.log('checking deleteRatingByUserID input', id)
        deleteRatingDTByUserID(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully delete ratings by given by id',
                });
            }     
        });
    },
}