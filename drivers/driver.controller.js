const {param} = require("./driver.router");

const {createDr,getDrDetails,updateDrDetail,getAllDrs} = require("./driver.service");

module.exports = {
    createDriver :(req, res)=> {
        const body = req.body;
        createDr(body, (err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json(
                    {
                        fatal: 0,
                        error: "Database connection error CODE: 500"
                    });

            }else{
                return res.status(200).json({
                    succss:'Driver created successfully',
                    data:body
                });
            }  


        });
    },
    getDriverDetails:(req, res) =>{
        const id = req.params.id;
        console.log('checking getDriverDetails input', id)
        getDrDetails(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:"Successfully fetched Driver details",
                    data:results
                });
            }     
        });
    },
    updateDriverDetails:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
        console.log('checking updated DriverDetails input', body)
        updateDrDetail(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:`Successfully updated driver details = ${id}`,
                    data:results
                });
            }         
        });
    },

    getAllDrivers:(req, res) =>{
        getAllDrs((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:'Successfully fetched all Drivers details',
                    data:results
                });
            }    
        });
    },

}