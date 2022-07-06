const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');

module.exports = {

    postABid: (data, callback) => {
        const udid = uuidv4();
        pool.query(`insert into sp_bid_details(sp_bid_id,user_id,idpost_load,tracking_no,sp_quote,is_negatiable,assigned_truck_id,assigned_driver_id,vehicle_model,feet,capacity,body_type,notes,bid_status,is_bid_accpted_by_sp) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [(data.sp_bid_id=udid),data.user_id,data.idpost_load,data.tracking_no,data.sp_quote,data.is_negatiable,data.assigned_truck_id,data.assigned_driver_id,data.vehicle_model,data.feet,data.capacity,data.body_type,data.notes,data.bid_status,data.is_bid_accpted_by_sp],
        (error, results, fields) =>{
            if(error){
                return callback(error);

            }
            return callback(null, results);
        }
        );
    },

    bidDTByUserID: (id, callback) =>{
        pool.query(`SELECT * FROM sp_bid_details WHERE user_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },

    bidDTBySPID: (id, callback) =>{
        pool.query(`SELECT 
        m.user_id,
        m.sp_bid_id,             
        m.sp_quote,
        m.revised_bid_quote_one,
        m.is_negatiable,
        m.assigned_truck_id,
        m.assigned_driver_id,
        m.capacity,
        m.body_type,
        m.notes,
        m.bid_status,
        m.is_bid_accpted_by_sp AS is_bid_accpted_by_sp, 
        c.tracking_no AS tracking_no,
        c.idpost_load AS idpost_load
    FROM
        sp_bid_details m
    INNER JOIN post_load c ON c.idpost_load = m.idpost_load where m.sp_bid_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    updateBidDt: (id,data, callback) =>{
    
        var query;
        var queryArray;
        if (data.revised_bid_quote_one!=null && data.is_negatiable!=null && data.assigned_truck_id!=null && data.assigned_driver_id!=null && data.notes!=null && data.bid_status!=null && data.is_bid_accpted_by_sp!=null){
            query = `update sp_bid_details set revised_bid_quote_one=?,is_negatiable=?, assigned_truck_id=?, assigned_driver_id=?,notes=?,bid_status=?,is_bid_accpted_by_sp=? where sp_bid_id =?`
            queryArray = [data.revised_bid_quote_one,data.is_negatiable,data.assigned_truck_id,data.assigned_driver_id,data.notes,data.bid_status,data.is_bid_accpted_by_sp,id]
        }else if(data.revised_bid_quote_one!=null){
            query = `update sp_bid_details set revised_bid_quote_one =? where sp_bid_id =?`
            queryArray = [data.revised_bid_quote_one,id]
          }else if(data.is_negatiable!=null){
            query =`update sp_bid_details set is_negatiable =? where sp_bid_id =?`
            queryArray = [data.is_negatiable,id]
          }else if(data.assigned_truck_id!=null){
            query =`update sp_bid_details set assigned_truck_id =? where sp_bid_id =?`
            queryArray = [data.assigned_truck_id,id]
          }else if(data.assigned_driver_id !=null){
              query = `update sp_bid_details set assigned_driver_id =? where sp_bid_id =?`
              queryArray =  [data.assigned_driver_id,id]
          }else if(data.notes !=null){
              query = `update sp_bid_details set notes =? where sp_bid_id =?`
              queryArray =  [data.notes,id]
          }else if(data.bid_status !=null){
            query = `update sp_bid_details set bid_status =? where sp_bid_id =?`
            queryArray =  [data.bid_status,id]
        }else if(data.is_bid_accpted_by_sp!=null){
            query = `update sp_bid_details set is_bid_accpted_by_sp =? where sp_bid_id =?`
            queryArray = [data.is_bid_accpted_by_sp,id]
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

    bidDTByPostID: (id, callback) =>{
        pool.query(`SELECT 
        m.user_id,
             m.sp_quote,
             m.revised_bid_quote_one,               
             m.is_negatiable,
             m.assigned_truck_id,
             m.assigned_driver_id,
             m.body_type,
             m.capacity,
             m.notes,
             m.bid_status,
             m.is_bid_accpted_by_sp,
             m.sp_bid_id AS sp_bid_id, 
             c.user_id AS lp_user_id,
             c.idpost_load AS post_load
         FROM
             sp_bid_details m
         INNER JOIN post_load c ON c.idpost_load = m.idpost_load where m.idpost_load = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },

    bidDetailsWithLoaddt: (userID, callback)=>{
        pool.query(`SELECT 
             m.user_id,
             m.sp_quote,
             m.is_negatiable,
             m.assigned_truck_id,
             m.assigned_driver_id,
             m.body_type,
             m.capacity,
             m.notes,
             m.bid_status AS sp_bid_status,
             m.is_bid_accpted_by_sp,
             m.sp_bid_id AS sp_bid_id, 
             c.pick_up_date, 
             c.pick_up_time, 
             c.budget, 
             c.revised_budget_one, 
             c.revised_budget_two, 
             c.bid_status, 
             c.capacity, 
             c.body_type, 
             c.pick_add, 
             c.pick_pin_code,
             c.pick_city, 
             c.pick_state, 
             c.pick_country, 
             c.drop_add, 
             c.drop_pin_code, 
             c.drop_city, 
             c.drop_state,
             c.drop_country, 
             c.km_approx, 
             c.notes_meterial_des, 
             c.payment_type, 
             c.advance_percentage,
             c.bid_ends_at,
             c.tracking_no,
             c.user_id AS lp_user_id,
             c.idpost_load AS post_load,
             'revisedBudgetDetails', json_arrayagg(
                json_object(
                    'idpost_load', b.idpost_load,
                    'sp_bid_id', b.sp_bid_id,
                    'revised_budget', b.revised_budget
                )
            )revisedBudgetDetails
         FROM
             sp_bid_details m
             left join revised_lp_budget b ON m.sp_bid_id = b.sp_bid_id
         INNER JOIN post_load c ON c.idpost_load = m.idpost_load where m.user_id =? group by c.idpost_load;`,
        [userID],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
        },

     
    

}