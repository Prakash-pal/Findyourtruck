const { param } = require("./user.route");

const {create, getUserDetailsByPhoneNumber,getAllUsers, getUserDetails, updateUserDetails, getLocationData,getUserDtByPhoneNo,allUsersRoleAsTruckOwner} = require("./user.service");
module.exports = {
    createUser:(req, res) => {
        const body = req.body;
       // body.upload_aadhar = req.file.filename;
       // console.log("Connection testing...........")
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                
                if(results.length>0){
                    return res.status(200).json({

                        Success:0,
                        Message: 'phone number already exists'+ body.phone_number
                        
                    });
                }
                
                return res.status(200).json({

                    Success:1,
                    Message:'User created Successfully',
                    data:body
                });
            }    
        });
    },
    getDetailsByPhNo:(req, res) =>{
        const id = req.params.id;
        
       
        console.log('checking getUserDetails input', id)
        getUserDetailsByPhoneNumber(id, (err, results) => {
         const [obj] = results;
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
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success: 1,
                    Message:"Successfully fetched user details",
                    data:obj
                });
            }     
        });
    },

    getUserDetails:(req, res) =>{
        const id = req.params.id;
        console.log('checking getUserDetails input', id)
        getUserDetails(id, (err, results) => {
            const [obj] = results;
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
                        Message:'No data Found'
                    });
                }


                return res.status(200).json({
                    Success:1,
                    Message: 'Succesfull fetched user details',
                    data:obj
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
                    Success:1,
                    Message:`Successfully updated user details = ${id}`,
                    data:results
                });
            }         
        });
    },
    getAllUsers:(req, res) =>{
        getAllUsers((err, results) => {
            // const [obj] = results;
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
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully fetched all users details',
                    data:results
                });
            }    
        });
    },
    getLocationData:(req, res) =>{
        const id = req.params.id;
        console.log('checking Pincode input', id)
        getLocationData(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                console.log(results[Object.keys(results)[0]]);
                var firstObj = results[Object.keys(results)[0]];
                if(firstObj !=null){
                    return res.status(200).json({
                        Success:'Successfully fetched all location details',
                        data:firstObj
                    });
                }
                return res.status(200).json({
                    Success:"No results",
                    data: {}
                });
               
            }     
        });
    },
    getUserDetailsByPhNo:(req, res) =>{
        const id = req.params.id;
        console.log('checking getUserDetailsByPhNo input', id)
        getUserDtByPhoneNo(id, (err, results) => {
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
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message: "Successfully fetched user details by phone Number",
                    data:results
                });
            }     
        });
    },




    ////////////////// admin ///////////
    allUsersAsOwner:(req, res) =>{
        allUsersRoleAsTruckOwner((err, results) => {
            // const [obj] = results;
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
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully fetched all users details',
                    data:results
                });
            }    
        });
    },
}