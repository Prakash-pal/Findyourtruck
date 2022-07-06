const {param} = require("./rc.router");

const { getVehicleRegistration} = require("./rc.service");

module.exports = {
   
        
    getRcDetails:(req, res) =>{
        const id = req.params.vehNo;
        const userID = req.params.userID;
        console.log('checking getRcDetails input',id, userID)
        getVehicleRegistration(userID,id,(err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                if(results.isSucess){
                    return res.status(200).json({
                        sucess:'rc number is availabel',
                        data:results.results
                    });
                }else{
                    return res.status(200).json({
                        fail:'rc number does not exist'
                    });
                }
                    
            
            }     
        });
    },
}