const {param} = require("./aadhaar.router");

const { getAadhaarDetails} = require("./aadhaar.service");

module.exports = {
   
        
    getAadhaarkDt:(req, res) =>{
        // const aadNo = req.params.aadNo;
        // const userID = req.params.userID;
        // const body = req.body;
        // // const ifsc = req.params.ifsc;
        // console.log('checking getAadhaarDetails input',userID,aadNo)
        // getAadhaarDetails(userID,aadNo,(err, results) => {
        
        //     console.log("error",err );
        //     console.log("controller Results",results );
        //     if(err){
        //         console.log(err);
        //         return res.status(500).json({
        //             fatal:0,
        //             data: "Database connection error "
        //         });
        //     }else{
            
        //         return res.status(200).json({
        //             succss:"Successfully fetched aadhaar details",
        //             data:results,
        //         });
        //     }     
        // });
        const aadNo = req.params.aadNo;
        const userID = req.params.userID;
        const ifsc = req.params.ifsc;
        console.log('checking getBankDt input',userID,aadNo,ifsc)
        getAadhaarDetails(userID,aadNo,(err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
               
                if(results.isSucess){
                    return res.status(200).json({
                    
                        sucess:'Aadhaar number is availabel',
                        data:results.results
                    });
                }else{
                    return res.status(200).json({
                        fail:'Aadhaar number does not exist'
                    });
                }
                    
            
            }     
        });
             
    }
}