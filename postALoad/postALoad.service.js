const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
const { now } = require("moment");

module.exports = {
    postaLoad: (data, callback) => {
        const udid = uuidv4();
        // const bidDT = new Date().toString();
        const d = new Date,
        bidDT = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');


        // bidDT.toLocaleString('en-US', {timeZone:"Asia/Kolkata",timeStyle: 'medium', hourCycle:'h12' });
          
        const endTime = new Date()
        endTime.setHours(endTime.getHours()+4);
        
        
        var today = new Date();

        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear().toString().substr(-2);

        today = dd + '.' + mm + '.' + yyyy;

        const tkNumber = Math.floor(1000 + Math.random() * 9000)+ '-' + today; 
    //    const tkNumber= Math.floor(x + (y - x) * Math.random());


        // const dt = new Date,
        // endTime = [dt.getMonth()+1,
        //  dt.getDate(),
        //  dt.getFullYear()].join('/')+' '+
        // [dt.getHours(),
        //  dt.getMinutes(),
        //  dt.getSeconds()].join(':');
        //  endTime.setHours(endTime.getHours()+4);        
        // const currTM = now();

        // const endTime = endTime - currTM;
        pool.query(`insert into post_load(idpost_load,tracking_no,user_id,pick_up_date,pick_up_time,budget,bid_status,capacity,body_type,pick_add,pick_pin_code,pick_city,pick_state,pick_country,drop_add,drop_pin_code,drop_city,drop_state,drop_country,km_approx,notes_meterial_des,bid_posted_at,bid_ends_at,sp_count,payment_type,advance_percentage) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [(data.idpost_load=udid),(data.tracking_no=tkNumber),data.user_id,data.pick_up_date,data.pick_up_time,data.budget,data.bid_status,data.capacity,data.body_type,data.pick_add,data.pick_pin_code,data.pick_city,data.pick_state,data.pick_country,data.drop_add,data.drop_pin_code,data.drop_city,data.drop_state,data.drop_country,data.km_approx,data.notes_meterial_des,(data.bid_posted_at=bidDT),(data.bid_ends_at=endTime),data.sp_count,data.payment_type,data.advance_percentage],
        (error, results, fields) =>{
            if(error){
                return callback(error);

            }
            return callback(null, results);
        
        }
        );
    },
    loadDTByUserID: (id, callback) =>{
        // const endTime = new Date()
        // endTime.setHours(endTime.getHours()+4);
        // //var milliseconds = date.getTime(); 
        // var currentTime = now();
        // var timeLeft = now()-endTime;

        // pool.query(`SELECT * FROM post_load WHERE user_id = ?`, 
        // [id],
        // (error, results, fields) => {
        //     if(error){
        //         return callback(error);
        //     }
           
        //     // var result = results[0]
        //     // result.time = timeLeft;
        //     return callback(null, results)
        // }
        // );

        pool.query(`select 
        
            'idpost_load', p.idpost_load,
            'tracking_no', p.tracking_no,
            'user_id', p.user_id,
            'pick_up_date', p.pick_up_date,
            'pick_up_time', p.pick_up_time,
            'budget', p.budget,
            'revised_budget_one', p.revised_budget_one,
            'bid_status', p.bid_status,
            'isBidWithdraw', p.isBidWithdraw,
            'capacity', p.capacity,
            'body_type', p.body_type,
            'pick_add', p.pick_add,
            'pick_pin_code', p.pick_pin_code,
            'pick_city', p.pick_city,
            'pick_state', 'pick_state',
            'pick_country', p.pick_country,
            'drop_add', p.drop_add,
            'drop_pin_code', p.drop_pin_code,
            'drop_city', p.drop_city,
           'drop_state', p.drop_state,
           'drop_country', p.drop_country,
           'km_approx', p.km_approx,
           'notes_meterial_des', p.notes_meterial_des ,
            'bid_posted_at', p.bid_posted_at,
            'bid_ends_at', p.bid_ends_at,
            'sp_count', p.sp_count,
            'revisedBudgetDetails', json_arrayagg(
                json_object(
                    'idpost_load', c.idpost_load,
                    'sp_bid_id', c.sp_bid_id,
                    'revised_budget', c.revised_budget
                )
            )revisedBudgetDetails
    from post_load p
     left join revised_lp_budget c on p.idpost_load = c.idpost_load
    where p.user_id=? group by p.idpost_load`, 
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
    loadDTByLoadID: (id, callback) =>{
        pool.query(`SELECT * FROM post_load WHERE idpost_load = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            results = results[0];
            pool.query(`SELECT sp_bid_id , revised_budget FROM revised_lp_budget WHERE idpost_load = ?`,
        [results.idpost_load],
        (error, revisedBudDt, fields) => {
            if(error){
                return callback(error);
            }
            results.revideBudget = revisedBudDt;
           
            return callback(null, results)
        }
        );
        }
        );
    },
    updatePostDt: (id,data, callback) =>{
    
        var query;
        var queryArray;
        const d = new Date,
        updatedTime = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');
        if (data.revised_budget_one!=null &&  data.bid_status!=null && data.sp_count!=null && data.notes_meterial_des!=null  && data.platform_fees!=null ){
            query = `update post_load set revised_budget_one=?,bid_status=?,sp_count=?,notes_meterial_des=?,platform_fees=? where idpost_load =?`;
            queryArray = [data.revised_budget_one,data.bid_status,data.sp_count,data.notes_meterial_des,data.platform_fees,id]
        }else if(data.revised_budget_one!=null){
            query = `update post_load set revised_budget_one =? where idpost_load =?`
            queryArray = [data.revised_budget_one,id]
        }else if(data.bid_status!=null){
            query =`update post_load set bid_status =? where idpost_load =?`
            queryArray = [data.bid_status,id]
        }else if(data.sp_count!=null){
            query =`update post_load set sp_count =? where idpost_load =?`
            queryArray = [data.sp_count,id]
        }else if(data.notes_meterial_des!=null){
            query =`update post_load set notes_meterial_des =? where idpost_load =?`
            queryArray = [data.notes_meterial_des,id]
        }else if(data.platform_fees!=null){
            query =`update post_load set platform_fees =? where idpost_load =?`
            queryArray = [data.platform_fees,id]
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
    allPostDt: (callback) =>{
        pool.query(`SELECT * FROM post_load;`,
        [],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    allPostdtBypCity: (pCity,callback) =>{

        pool.query(`select * from post_load where pick_city =?`,
        [pCity],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    allPostdtBydCity: (dCity,callback) =>{

        pool.query(`select * from post_load where drop_city =?`,
        [dCity],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    allPostbytType: (tkType,callback) =>{

        pool.query(`select * from post_load where body_type =?`,
        [tkType],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    allPostbyPkdate: (pkDate,callback) =>{

        pool.query(`select * from post_load where pick_up_date =?`,
        [pkDate],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },

    postsByPcityCount: (callback) =>{
        pool.query(`SELECT pick_city, COUNT(*)as count FROM post_load where bid_status in ('loadPosted','loadReactivated','isBidWithdraw') GROUP BY pick_city order by COUNT(*) DESC;`,
        [],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    postsByDcityCount: (callback) =>{
        pool.query(`SELECT drop_city, COUNT(*)as count FROM post_load where bid_status in ('loadPosted','loadReactivated','isBidWithdraw') GROUP BY drop_city order by COUNT(*) DESC;`,
        [],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    postsByTkTypeCount: (callback) =>{
        pool.query(`SELECT capacity, COUNT(*)as count FROM post_load GROUP BY capacity order by COUNT(*) DESC;`,
        [],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    postsByPDateCount: (callback) =>{
        pool.query(`SELECT pick_up_date, COUNT(*)as count FROM post_load GROUP BY pick_up_date order by COUNT(*) DESC;`,
        [],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
}