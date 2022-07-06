const {param} = require("./prefLocation.router");
const {addPrefLocation,getPrefDetails,deletePrefDetails} = require("./prefLocation.service");

module.exports = {
    addPreLocation :(req, res)=> {
        const body = req.body;
        addPrefLocation(body, (err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json(
                    {
                        fatal: 0,
                        error: "Database connection error CODE: 500"
                    });

            }else{
                return res.status(200).json({
                    Success:1,
                    Message:'successfully added preferred location',
                    data:body
                });
            }  


        });
    },
    getPrefLocation:(req, res) =>{
        const id = req.params.id;
        console.log('checking getPfreLocation input', id)
        getPrefDetails(id, (err, results) => {
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
                    Message:"Successfully fetched user Preferred Locations",
                    data:results
                });
            }     
        });
    },
    deletPrefLocation:(req, res) =>{
        const id = req.params.id;
        console.log('checking deletPrefLocation input', id)
        deletePrefDetails(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:"Successfully deleted user Preferred Location",
                    
                });
            }     
        });
    },
}