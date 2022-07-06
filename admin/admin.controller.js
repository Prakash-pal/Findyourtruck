const {param} = require("./admin.router");
const{createPlatformCharges,getCharges,updateCharges} = require ("./admin.service");

module.exports = {
    createCharges :(req, res)=> {
        const body = req.body;
        createPlatformCharges(body, (err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json(
                    {
                        fatal: 0,
                        error: "Database connection error CODE: 500"
                    });

            }else{
                return res.status(200).json({
                    succss:'Platform charges added successfully',
                    data:body
                });
            }  


        });
    },
    getChargesDetails:(req, res) =>{
        const id = req.params.id;
        console.log('checking getChargesDetails input', id)
        getCharges((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:"Successfully fetched Platform charges details",
                    data:results
                });
            }     
        });
    },
    updateChargesDetails:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
        console.log('checking updated Platform charges input', body)
        updateCharges(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:`Successfully updated Platform charges = ${id}`,
                    data:results
                });
            }         
        });
    },
}