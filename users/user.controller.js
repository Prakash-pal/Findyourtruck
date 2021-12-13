const { param } = require("./user.route");

const {create, getAllUsers, getUserDetails, updateUserDetails} = require("./user.service");
module.exports = {
    createUser:(req, res) => {
        const body = req.body;
        body.upload_aadhar = req.file.filename;
       // console.log("Connection testing...........")
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                console.log(results.length);
                if(results.length>0){
                    return res.status(200).json({

                        fail:'alredy exist',
                        data:body
                    });
                }
                
                return res.status(200).json({

                    succss:'User created successfully',
                    data:body
                });
            }    
        });
    },
    getUserDetails:(req, res) =>{
        const id = req.params.id;
        console.log('checking getUserDetails input', id)
        getUserDetails(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:"Successfully fetched user details",
                    data:results
                });
            }     
        });
    },
    updateUserDetails:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
        console.log('checking updated UserDetails input', body)
        updateUserDetails(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:`Successfully updated user details = ${id}`,
                    data:results
                });
            }         
        });
    },
    getAllUsers:(req, res) =>{
        getAllUsers((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    succss:'Successfully fetched all users details',
                    data:results
                });
            }    
        });
    },
}