const {param} = require("./pan.router");

const {createPan, getPanDt} = require("./pan.service");

module.exports = {
    createPanLite :(req, res)=> {
        const body = req.body;
        createPan(body, (err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json(
                    {
                        fatal: 0,
                        error: "Database connection error CODE: 500"
                    });

            }else{
                return res.status(200).json({
                    succss:'pan created successfully',
                    data:body
                });
            }  


        });
    },

        
    getPanDetails:(req, res) =>{
        const panNum = req.params.panNum;
        const userId = req.params.userId;
        console.log('checking getPanDetails input', userId)
        getPanDt(userId,panNum,(err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                if(results.isSucess){
                    return res.status(200).json({
                        sucess:'pan number is availabel',
                        data:results.results
                    });
                }else{
                    return res.status(200).json({
                        fail:'pan number does not exist'
                    });
                }
                    
            
            }     
        });
    },
}