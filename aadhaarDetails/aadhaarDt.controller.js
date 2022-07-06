const {param} = require("./aadhaarDt.router");

const { getAadhaar} = require("./aadhaarDt.service");

module.exports = {
   
        
    getAadhaarDetails:(req, res) =>{
        const suerID = req.params.suerID;
        const aadNo = req.params.aadNo;
        const request_id = req.params.request_id;
        const otp = req.params.otp;
        console.log('checking getDLDetails input',aadNo, request_id)
        getAadhaar(suerID,aadNo,request_id,otp,(err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                if(results.isSucess){
                    return res.status(200).json({
                        sucess:'aadhaar number is availabel',
                        data:results.results
                    });
                }else{
                    return res.status(200).json({
                        fail:'aadhaar number does not exist'
                    });
                }
                    
            
            }     
        });
    },
}