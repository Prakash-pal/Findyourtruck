const {param} = require ("./image.router");
const {createImg, updateImage, getImageByUserId} = require("./image.service");


module.exports = {
    createImage :(req, res)=> {

        
        const body = req.body;
        createImg(body, (err, results)=> {
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
                    Message:'Account added successfully',
                    data:body
                });
            }  


        });
    },
    updateImage :(req, res)=> {
        console.log("imageUrl.....",req.params.user  );
        var imageUrl = req.file.location
        var userId =req.params.user 
        var imageType =req.params.type 
        console.log("userId.....",userId);
        const body = req.body;
        body.imageUrl=imageUrl;
        
        updateImage(body, userId, imageType, (err, results)=> {
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
                    Message:'Image updated successfully',
                    data:body
                });
            }  


        });
    },
    getImageByUserId :(req, res)=> {
        var userId =req.params.user 
        console.log("userId.....",userId)
        getImageByUserId(userId, (err, results)=> {
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
                    Message:'Successfully fetched user images details',
                    data:results
                });
            }     
        });
    },
    



}