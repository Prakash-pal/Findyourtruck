const {param} = require("./dl.router");

const { getDriverlicense} = require("./dl.service");

module.exports = {
   
        
    getDLDetails:(req, res) =>{
        const suerID = req.params.suerID;
        const dlNo = req.params.dlNo;
        const dob = req.params.dob;
        console.log('checking getDLDetails input',dlNo, dob)
        getDriverlicense(suerID,dlNo,dob,(err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                if(results.isSucess){
                    return res.status(200).json({
                        sucess:'dl number is availabel',
                        data:results.results
                    });
                }else{
                    return res.status(200).json({
                        fail:'dl number does not exist'
                    });
                }
                    
            
            }     
        });
    },
}