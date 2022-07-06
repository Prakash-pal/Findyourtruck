const {param} = require("./trcuckType.router");
const {createTkType, allTruckTP} = require('./truckType.service');


module.exports = {
    createTruckType :(req, res)=> {
        const body = req.body;
        createTkType(body, (err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json(
                    {
                        fatal: 0,
                        error: "Database connection error CODE: 500"
                    });

            }else{
                return res.status(200).json({
                    succss:'Truck type created successfully',
                    data:body
                });
            }  


        });
    },

    allTruckTypes: (req, res) =>{
        allTruckTP((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:'Successfully fetched all truck details',
                    data:results
                });
            }    
        });
    },
    

}