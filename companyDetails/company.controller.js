const {param} = require("./company.router");

const {createComp,getCompDetails,updateCompDetail} = require("./company.service");

module.exports = {

    createCompany :(req, res)=> {
        const body = req.body;
        createComp(body, (err, results)=> {
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
                    Message: 'Company created successfully',
                    data:body
                });
            }  


        });
    },
    getCompanyDetails:(req, res) =>{
        const id = req.params.id;
        console.log('checking getCompanyDetails input', id)
        getCompDetails(id, (err, results) => {
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
                    Message: 'Successfully fetched Company details',
                    data:obj
                });
            }     
        });
    },
    updateCompanyDetails:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
        console.log('checking updated Company input', body)
        updateCompDetail(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message: 'Successfully updated Company Details details = ${id}',
                    data:results
                });
            }         
        });
    },

}