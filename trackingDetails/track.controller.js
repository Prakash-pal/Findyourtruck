const {param} = require("./track.router");
const {createALoadTracker,spTrackingDetails,lpTrackingDetails,allTrackingIDs,updateTrackingByTkID,trackingDetailsByTkId,lpTrackingHistory,spTrackingHistory} = require("./track.service");

module.exports = {
    postLoadTrackingId: (req, res)=>{
        const body = req.body;
        createALoadTracker (body,(err, results)=>{
            if(err){
                return res.status(500).json({
                    fatal:0,
                    error: 'Database connection error CODE: 200'

                });

            }else if(results){
                return res.status(200).json({
                    Success: 1,
                    Message: 'TrackingID created Successfully',
                    data:body

                });

            }

        });

    },

    trackingDetailsBySpid:(req, res) =>{
        const spID = req.params.spID;
        console.log('checking trackingDetailsBySpid input', spID)
        spTrackingDetails(spID, (err, results) => {
            if(err){
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
        
            }else{
                console.log("trackingDetailsBySpid",results.length)
                if(results.length==0){
                    return res.status(200).json({

                        Success:0,
                        Message:'No data Found'
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message: 'Successfully fetched Tracking details by SP ID',
                    data:results
                });
            }     
        });
    },
    trackingDetailsByLpid:(req, res) =>{
        const lpID = req.params.lpID;
        console.log('checking trackingDetailsByLpid input', lpID)
        lpTrackingDetails(lpID, (err, results) => {
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
                    Message: 'Successfully fetched Tracking details by Load PosterID',
                    data:results
                });
            }     
        });
    },
    trackingDtbyTkid:(req, res) =>{
        const tkid = req.params.tkid;
        console.log('checking trackingDtbyTkid input', tkid)
        trackingDetailsByTkId(tkid, (err, results) => {
            const [obj] =results
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
                        Message:'No data Found for the tracker id'
                    });
                }
                return res.status(200).json({
                    Success:1,
                    Message: 'Successfully fetched Tracking details by Track ID',
                    data:obj
                });
            }     
        });
    },

    updateTrackingDetailsTkId:(req, res) =>{
        const body = req.body;
        const trackID = req.params.trackID;
        console.log('checking updated updateBankDetails By Bank ID input', body)
        updateTrackingByTkID(trackID,body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    fatal:0,
                    data: "Database connection error "
                });
            }else{
                return res.status(200).json({
                    Success:1,
                    Message:`Successfully updated Bank details = ${trackID}`,
                    data:results
                });
            }         
        });
    },
    allTrackingIDsDetails:(req, res) =>{
        allTrackingIDs((err, results) => {
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
                    Message: 'Successfully fetched all Tracking IDs details',
                    data:results
                });
            }    
        });
    },
    trackingHistoryByLpid:(req, res) =>{
        const idLP = req.params.idLP;
        console.log('checking trackingHistoryByLpid input', idLP)
        lpTrackingHistory(idLP, (err, results) => {
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
                    Message: 'Successfully fetched Tracking details by Load PosterID',
                    data:results
                });
            }     
        });
    },
    trackingHistoryBySPid:(req, res) =>{
        const idSP = req.params.idSP;
        console.log('checking trackingHistoryBySPid input', idSP)
        spTrackingHistory(idSP, (err, results) => {
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
                    Message: 'Successfully fetched Tracking details by Load PosterID',
                    data:results
                });
            }     
        });
    },
}