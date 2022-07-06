const {param} = require("./bankLite.router");

const { getBankDetails} = require("./bankLite.service");

module.exports = {
   
        
    getBankDt:(req, res) =>{
        const accNo = req.params.accNo;
        const userID = req.params.userID;
        const ifsc = req.params.ifsc;
        console.log('checking getBankDt input',userID,accNo,ifsc)
        getBankDetails(userID,accNo,ifsc,(err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
               
                if(results.isSucess){
                    return res.status(200).json({
                    
                        sucess:'Bank account number is availabel',
                        data:results.results
                    });
                }else{
                    return res.status(200).json({
                        fail:'account number does not exist'
                    });
                }
                    
            
            }     
        });
    },
}