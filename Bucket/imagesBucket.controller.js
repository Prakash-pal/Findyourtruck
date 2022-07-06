const {param} = require("./imagesBucket.router");
const {creatIMG} = require("./imagesBucket.service");

module.exports = {

    addImages:(req, res) => {
        const body = req.body;
       // console.log("Connection testing...........")
       creatIMG(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    succss:1,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:'Truck added successfully',
                    data:body
                });
            }    
        });
    },
}