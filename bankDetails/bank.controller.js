const {param} = require("./bank.router");

const {createAcc,getBankDeatils,updateBKDetail,bankDetails, getBkDetailByBkID,uploadCheque, updateBKBkId,deleteBankDetails} = require("./bank.service");

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

            }else if (results){
                return res.status(200).json({
                    Success:1,
                    Message: 'Account added successfully',
                    data:body
                });
            }  


        });
    },
   
    updateBankDetails:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
        console.log('checking updated updateBankDetails input', body)
        updateBKDetail(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
            
                return res.status(200).json({
                    Success:1,
                    Message: `Successfully updated Bank details = ${id}`,
                    data:results
                });
            }         
        });
    },
    allBankDetails:(req, res) =>{
        bankDetails((err, results) => {
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
                    Message: 'Successfully fetched all Banks details',
                    data:results
                });
            }    
        });
    },
    bankDetailsByUser:(req, res) =>{
        const id = req.params.id;
        console.log('checking bankDetailsByUser input', id)
        getBankDeatils(id, (err, results) => {
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
                    Message: 'Successfully fetched Bank details',
                    data:results
                });
            }     
        });
    },
    getBankDetailsBKId:(req, res) =>{
        const id = req.params.id;
        console.log('checking getBankDetailsBKId input', id)
        getBkDetailByBkID(id, (err, results) => {
            const [obj] = results
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
                    Message:'Successfully Driver details by User ID',
                    data:obj
                });
            }     
        });
    },
    uploadCancelCheque:(req, res) =>{
        const id = req.params.id;
        uploadCheque(req.files, id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message: `Successfully updated cancelled Cheque Images details = ${id}`,
                    data:results
                });
            }         
        });
    },
    updateBankDetailsByBkId:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
        console.log('checking updated updateBankDetails By Bank ID input', body)
        updateBKBkId(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated Bank details = ${id}`,
                    data:results
                });
            }         
        });
    },
    deleteBankDt:(req, res) =>{
        const id = req.params.id;
        console.log('checking deleteBankDt input', id)
        deleteBankDetails(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message: 'Successfully deleted user Bank details'
                    // data:results
                });
            }     
        });
    },

}