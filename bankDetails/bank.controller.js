const {param} = require("./bank.router");

const {createAcc,getBKDetailsByUserID} = require("./bank.service");

module.exports = {
    createBankAcc :(req, res)=> {
        const body = req.body;
        createAcc(body, (err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json(
                    {
                        fatal: 0,
                        error: "Database connection error CODE: 500"
                    });

            }else{
                return res.status(200).json({
                    succss:'Account added successfully',
                    data:body
                });
            }  


        });
    },
    getBankDetailsByID:(req, res) =>{
        const id = req.params.id;
        console.log('checking getDriverDetails input', id)
        getBKDetailsByUserID(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:"Successfully fetched Truck details",
                    data:results
                });
            }     
        });
    },


}