const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');

module.exports = {
    createALoadTracker: (data, callback)=>{
        const udid = uuidv4();
        pool.query(`insert into tracking (tracking_id,tracking_no,lp_user_id,sp_user_id,lp_name,lp_phoneNo,sp_name,sp_mobile_no,pick_up_date,pick_up_time,budget,distance,body,capiacty,pick_city,pick_state,pick_pin,pick_add,drop_city,drop_state,drop_pin,drop_add,sp_note,notes_meterial_des,payment_type,advance_percentage,revised_budget_one,sp_quote,sp_filnal_quote,is_negatiable,truck,vehicle_type,body_type,driver,withdrawn_by,is_trip_withdrawn,is_shipment_picked_up,is_shipment_in_transit,is_shipment_delevered,platform_charges,sp_current_lat,sp_current_long)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [(data.tracking_id=udid),data.tracking_no,data.lp_user_id,data.sp_user_id,data.lp_name,data.lp_phoneNo,data.sp_name,data.sp_mobile_no,data.pick_up_date,data.pick_up_time,data.budget,data.distance,data.body,data.capiacty,data.pick_city,data.pick_state,data.pick_pin,data.pick_add,data.drop_city,data.drop_state,data.drop_pin,data.drop_add,data.sp_note,data.notes_meterial_des,data.payment_type,data.advance_percentage,data.revised_budget_one,data.sp_quote,data.sp_filnal_quote,data.is_negatiable,data.truck,data.vehicle_type,data.body_type,data.driver,data.withdrawn_by,data.is_trip_withdrawn,data.is_shipment_picked_up,data.is_shipment_in_transit,data.is_shipment_delevered,data.platform_charges,data.sp_current_lat,data.sp_current_long],
        (error, results, fields) =>{
            if(error){
                return callback (error);

            }
            return callback(null, results);
        }
        );

    },
    spTrackingDetails: (spID, callback) =>{
        pool.query(`SELECT * FROM tracking WHERE sp_user_id = ?`,
        [spID],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    lpTrackingDetails: (id, callback) =>{
        pool.query(`SELECT * FROM tracking WHERE lp_user_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    trackingDetailsByTkId: (tkid, callback) =>{
        pool.query(`SELECT * FROM tracking WHERE tracking_no = ?`,
        [tkid],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    updateTrackingByTkID: (trackID,data, callback) =>{
        const d = new Date,
        updatedTime = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');
        var query;
        var queryArray;
        if (data.truck!=null && data.vehicle_type!=null && data.body_type!=null && data.driver!=null && data.withdrawn_by!=null && data.is_trip_withdrawn!=null && data.is_shipment_picked_up!=null && data.is_shipment_in_transit!=null && data.is_shipment_delevered!=null && data.sp_current_lat!=null && data.sp_current_long!=null && data.is_lp_rating_done!=null && data.is_sp_rating_done!=null){
            query = `update tracking set truck=?,vehicle_type=?,body_type=?,driver=?, withdrawn_by=?,is_trip_withdrawn=?,is_shipment_picked_up=?,is_shipment_in_transit=?,is_shipment_delevered=?,sp_current_lat=?,sp_current_long=?,is_lp_rating_done=?,is_sp_rating_done=? where tracking_no =?`
            queryArray = [data.truck,data.vehicle_type,data.body_type,data.driver,data.withdrawn_by,data.is_trip_withdrawn,data.is_shipment_picked_up,data.is_shipment_in_transit,data.is_shipment_delevered,data.sp_current_lat,data.sp_current_long,data.is_lp_rating_done,data.is_sp_rating_done,trackID]
        }else if(data.truck!=null){
            query = `update tracking set truck =? where tracking_no =?`
            queryArray = [data.truck,trackID]
        }else if(data.vehicle_type!=null){
            query = `update tracking set vehicle_type =? where tracking_no =?`
            queryArray = [data.vehicle_type,trackID]
        }else if(data.body_type!=null){
            query = `update tracking set body_type =? where tracking_no =?`
            queryArray = [data.body_type,trackID]
        }else if(data.driver!=null){
            query = `update tracking set driver =? where tracking_no =?`
            queryArray = [data.driver,trackID]
        }else if(data.withdrawn_by!=null){
            query = `update tracking set withdrawn_by =? where tracking_no =?`
            queryArray = [data.withdrawn_by,trackID]
        }else if(data.is_trip_withdrawn!=null){
            query = `update tracking set is_trip_withdrawn =? where tracking_no =?`
            queryArray = [data.is_trip_withdrawn,trackID]
        }else if(data.is_shipment_picked_up!=null){
            query = `update tracking set is_shipment_picked_up =? where tracking_no =?`
            queryArray = [data.is_shipment_picked_up,trackID]
        }else if(data.is_shipment_in_transit!=null){
            query = `update tracking set is_shipment_in_transit =? where tracking_no =?`
            queryArray = [data.is_shipment_in_transit,trackID]
        }else if(data.is_shipment_delevered!=null){
            query = `update tracking set is_shipment_delevered =? where tracking_no =?`
            queryArray = [data.is_shipment_delevered,trackID]
        }else if(data.sp_current_lat!=null){
            query = `update tracking set sp_current_lat =? where tracking_no =?`
            queryArray = [data.sp_current_lat,trackID]
        }else if(data.sp_current_long!=null){
            query = `update tracking set sp_current_long =? where tracking_no =?`
            queryArray = [data.sp_current_long,trackID]
        }else if(data.is_lp_rating_done!=null){
            query = `update tracking set is_lp_rating_done =? where tracking_no =?`
            queryArray = [data.is_lp_rating_done,trackID]
        }else if(data.is_sp_rating_done!=null){
            query = `update tracking set is_sp_rating_done =? where tracking_no =?`
            queryArray = [data.is_sp_rating_done,trackID]
        }

        pool.query(query,
            queryArray,

        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, data);
        }
        );
    },

    allTrackingIDs: (callback)=> {
        pool.query(`SELECT * FROM tracking;`,
        [],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);

        });

    },

    lpTrackingHistory: (idLP, callback) =>{
        pool.query(`SELECT * FROM tracking WHERE is_shipment_delevered =1 AND lp_user_id = ?`,
        [idLP],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    spTrackingHistory: (idSP, callback) =>{
        pool.query(`SELECT * FROM tracking WHERE is_shipment_delevered =1 AND sp_user_id = ?`,
        [idSP],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },

}