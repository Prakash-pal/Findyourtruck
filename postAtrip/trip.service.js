const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
const { now } = require("moment");

module.exports = {
    postaTrip: (data, callback) => {
        const udid = uuidv4();
        const d = new Date,
        bidDT = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');
        const endTime = new Date()
        endTime.setHours(endTime.getHours()+4);
        pool.query(`insert into post_a_trip(trip_id,user_id,trip_date,trip_start_time,trip_budget,vehicle_model,feet,capacity,body_type,pick_add,pick_pin_code,pick_city,pick_state,pick_country,drop_add,drop_pin_code,drop_city,drop_state,drop_country,notes_meterial_des,trip_posted_at,trip_ends_at,customer_count,payment_type) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [(data.trip_id=udid),data.user_id,data.trip_date,data.trip_start_time,data.trip_budget,data.vehicle_model,data.feet,data.capacity,data.body_type,data.pick_add,data.pick_pin_code,data.pick_city,data.pick_state,data.pick_country,data.drop_add,data.drop_pin_code,data.drop_city,data.drop_state,data.drop_country,data.notes_meterial_des,(data.trip_posted_at=bidDT),(data.trip_ends_at=endTime),data.customer_count,data.payment_type],
        (error, results, fields) =>{
            if(error){
                return callback(error);

            }
            return callback(null, results);
        
        }
        );
    },
    tripDTByUserID: (id, callback) =>{
        const endTime = new Date()
        endTime.setHours(endTime.getHours()+4);
        //var milliseconds = date.getTime(); 
        var currentTime = now();


        var timeLeft = now()-endTime;

        pool.query(`SELECT * FROM post_a_trip WHERE user_id = ?`  , 
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
           
            // var result = results[0]
            // result.time = timeLeft;
            return callback(null, results)
        }
        );
    },
    tripDTByTripID: (id, callback) =>{
        pool.query(`SELECT * FROM post_a_trip WHERE trip_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    updateTripDt: (id,data, callback) =>{
    
        var query;
        var queryArray;
        const d = new Date,
        updatedTime = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');
        if (data.trip_date!=null && data.trip_start_time!=null && data.trip_budget!=null && data.revised_trip_budget_one!=null && data.revised_trip_budget_two!=null && data.trip_status!=null && data.vehicle_model!=null && data.feet!=null && data.capacity!=null && data.body_type!=null && data.pick_add!=null && data.pick_pin_code!=null && data.pick_city!=null && data.pick_state!=null && data.pick_country!=null && data.drop_add!=null && data.drop_pin_code!=null && data.drop_city!=null && data.drop_state!=null && data.drop_country!=null && data.notes_meterial_des!=null && data.customer_count!=null && data.payment_type!=null){
            query = `update post_a_trip set trip_date=?,trip_start_time=?,trip_budget=?,revised_trip_budget_one=?,revised_trip_budget_two=?,trip_status=?,vehicle_model=?,feet=?,capacity=?,body_type=?,pick_add=?,pick_pin_code=?,pick_city=?,pick_state=?,pick_country=?,drop_add=?,drop_pin_code=?,drop_city=?,drop_state=?,drop_country=?,notes_meterial_des=?,customer_count=?,payment_type=? where trip_id =?`
            queryArray = [data.trip_date,data.trip_start_time,data.trip_budget,data.revised_trip_budget_one,data.revised_trip_budget_two,data.trip_status,data.vehicle_model,data.feet,data.capacity,data.body_type,data.pick_add,data.pick_pin_code,data.pick_city,data.pick_state,data.pick_country,data.drop_add,data.drop_pin_code,data.drop_city,data.drop_state,data.drop_country,data.notes_meterial_des,data.customer_count,data.payment_type,id]
        }else if(data.trip_date!=null){
            query = `update post_a_trip set trip_date=? where trip_id =?`
            queryArray = [data.trip_date,id]
          }else if(data.trip_start_time!=null){
            query = `update post_a_trip set trip_start_time=? where trip_id =?`
            queryArray = [data.trip_start_time,id]
          }else if(data.trip_budget!=null){
            query = `update post_a_trip set trip_budget=? where trip_id =?`
            queryArray = [data.trip_budget,id]
          }else if(data.revised_trip_budget_one!=null){
            query = `update post_a_trip set revised_trip_budget_one=? where trip_id =?`
            queryArray = [data.revised_trip_budget_one,id]
          }else if(data.revised_trip_budget_two!=null){
            query = `update post_a_trip set revised_trip_budget_two=? where trip_id =?`
            queryArray = [data.revised_trip_budget_two,id]
          }else if(data.trip_status!=null){
            query = `update post_a_trip set trip_status=? where trip_id =?`
            queryArray = [data.trip_status,id]
          }else if(data.vehicle_model!=null){
            query = `update post_a_trip set vehicle_model=? where trip_id =?`
            queryArray = [data.vehicle_model,id]
          }else if(data.feet!=null){
            query = `update post_a_trip set feet=? where trip_id =?`
            queryArray = [data.feet,id]
          }else if(data.capacity!=null){
            query = `update post_a_trip set capacity=? where trip_id =?`
            queryArray = [data.capacity,id]
          }else if(data.body_type!=null){
            query = `update post_a_trip set body_type=? where trip_id =?`
            queryArray = [data.body_type,id]
          }else if(data.pick_add!=null){
            query = `update post_a_trip set pick_add=? where trip_id =?`
            queryArray = [data.pick_add,id]
          }else if(data.pick_pin_code!=null){
            query = `update post_a_trip set pick_pin_code=? where trip_id =?`
            queryArray = [data.pick_pin_code,id]
          }else if(data.pick_city!=null){
            query = `update post_a_trip set pick_city=? where trip_id =?`
            queryArray = [data.pick_city,id]
          }else if(data.pick_state!=null){
            query = `update post_a_trip set pick_state=? where trip_id =?`
            queryArray = [data.pick_state,id]
          }else if(data.pick_country!=null){
            query = `update post_a_trip set pick_country=? where trip_id =?`
            queryArray = [data.pick_country,id]
          }else if(data.drop_add!=null){
            query = `update post_a_trip set drop_add=? where trip_id =?`
            queryArray = [data.drop_add,id]
          }else if(data.drop_pin_code!=null){
            query = `update post_a_trip set drop_pin_code=? where trip_id =?`
            queryArray = [data.drop_pin_code,id]
          }else if(data.drop_city!=null){
            query = `update post_a_trip set drop_city=? where trip_id =?`
            queryArray = [data.drop_city,id]
          }else if(data.drop_state!=null){
            query = `update post_a_trip set drop_state=? where trip_id =?`
            queryArray = [data.drop_state,id]
          }else if(data.drop_country!=null){
            query = `update post_a_trip set drop_country=? where trip_id =?`
            queryArray = [data.drop_country,id]
          }else if(data.notes_meterial_des!=null){
            query = `update post_a_trip set notes_meterial_des=? where trip_id =?`
            queryArray = [data.notes_meterial_des,id]
          }else if(data.customer_count!=null){
            query = `update post_a_trip set customer_count=? where trip_id =?`
            queryArray = [data.customer_count,id]
          }else if(data.payment_type!=null){
            query = `update post_a_trip set payment_type=? where trip_id =?`
            queryArray = [data.payment_type,id]
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
    allTripsDt: (callback) =>{
        pool.query(`SELECT  
        t.user_id,
        t.trip_date,
        t.trip_start_time,
        t.trip_budget,
        t.revised_trip_budget_one,
        t.revised_trip_budget_two,
        t.trip_status,
        t.body_type,
        t.capacity,
        t.pick_add,
        t.pick_pin_code,
        t.pick_city,
        t.pick_state,
        t.pick_country,
        t.drop_add,
        t.drop_pin_code,
        t.drop_city,
        t.drop_state,
        t.drop_country,
        t.notes_meterial_des,
        t.customer_count,
        t.payment_type,
        t.trip_id,
        t.trip_posted_at,
        s.name AS sp_name,
        s.phone_number,
        s.alternate_ph_no
        FROM 
            post_a_trip t
        INNER JOIN users s ON t.user_id = s.user_id WHERE t.trip_date >= CURDATE()
        ;`,
        [],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    deleteTripDetails: (id, callback) =>{
      pool.query(`DELETE FROM post_a_trip WHERE trip_id = ?`,
      [id],
      (error, results, fields) => {
          if(error){
              return callback(error);
          }
          return callback(null, results)
      }
      );
  },

}