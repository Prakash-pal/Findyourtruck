const {param} = require("./postALoad.router");

const {postaLoad,loadDTByUserID,loadDTByLoadID,updatePostDt,allPostDt,allPostdtBypCity,allPostdtBydCity,allPostbytType,allPostbyPkdate,postsByPcityCount,postsByDcityCount,postsByPDateCount,postsByTkTypeCount}= require("./postALoad.service");

module.exports = {

    postALoad :(req, res)=>{
        const body = req.body;
        postaLoad(body,(err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json(
                    {
                        fatal: 0,
                        error: "Database connection error CODE: 500"

                     });
            }else if (results){
                return res.status(200).json(
                    {
                        Success:1,
                        Message:'load posted Successfully',
                        data:body

                    });

            }

        });


    },
    loadDetailsByUserId:(req, res) =>{
        const id = req.params.id;
        console.log('checking loadDetailsByUserId input', id)
        loadDTByUserID(id, (err, results) => {
           
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                // var result = results[0]
                // result.time = 4;
                if(results.length==0){
                    return res.status(200).json({

                        Success:0,
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message:'Successfully fetched load details by user id',
                    data: results
                });
            }     
        });
    },
    loadDetailsByLoadID:(req, res) =>{
        const id = req.params.id;
        console.log('checking loadDetailsByUserId input', id)
        loadDTByLoadID(id, (err, results) => {
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
                    Message:'Successfully fetched load details by user id',
                    data:results
                });
            }     
        });
    },
    updatePostDetails:(req, res) =>{
        const body = req.body;
        const id = req.params.id;
        console.log('checking updated updatePostDetails input', body)
        updatePostDt(id,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated Post Load details = ${id}`,
                    data:results
                });
            }         
        });
    },

    allPostDetails:(req, res) =>{
        allPostDt((err, results) => {
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
                    Message:'Successfully fetched all Posts details',
                    data:results
                });
            }    
        });
    },
    allPostDtbypCity:(req, res) =>{
        const pCity = req.params.pCity;

        allPostdtBypCity(pCity,(err, results) => {
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
                    Message:'Successfully fetched all Posts details',
                    data:results
                });
            }    
        });
    },
    allPostDtbydCity:(req, res) =>{
        const dCity = req.params.dCity;

        allPostdtBydCity(dCity,(err, results) => {
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
                    Message:'Successfully fetched all Posts details',
                    data:results
                });
            }    
        });
    },
    allPostDtbyTkType:(req, res) =>{
        
        const tkType = req.params.tkType;

        allPostbytType(tkType,(err, results) => {
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
                    Message:'Successfully fetched all Posts details',
                    data:results
                });
            }    
        });
    },
    allPostDtbypDate:(req, res) =>{
        const pkDate = req.params.pkDate;
        

        allPostbyPkdate(pkDate,(err, results) => {
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
                    Message:'Successfully fetched all Posts details',
                    data:results
                });
            }    
        });
    },
    postByPickCCount:(req, res) =>{
        postsByPcityCount((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error"
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
                    Message:'Successfully fetched all Posts details',
                    data:results
                });
            }    
        });
    },

    postByDropCCount:(req, res) =>{
        postsByDcityCount((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error"
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
                    Message:'Successfully fetched all Posts details',
                    data:results
                });
            }    
        });
    },
    postByTruckTypeCount:(req, res) =>{
        postsByTkTypeCount((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error"
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
                    Message:'Successfully fetched all Posts details',
                    data:results
                });
            }    
        });
    },
    postByPdateCount:(req, res) =>{
        postsByPDateCount((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error"
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
                    Message:'Successfully fetched all Posts details',
                    data:results
                });
            }    
        });
    },

}