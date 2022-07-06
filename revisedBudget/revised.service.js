const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
module.exports = {
    createRevisedB: (data, callback)=>{
        const udid = uuidv4();

        pool.query(`insert into revised_lp_budget(revised_lp_budget_id,idpost_load,sp_bid_id,revised_budget,user_id) values(?,?,?,?,?)`,
        [(data.revised_lp_budget_id =udid ),data.idpost_load,data.sp_bid_id,data.revised_budget,user_id],
        (error, results, fields) =>{
            if(error){
                return callback(error);

            }
            return callback(null, results);
        }
        );

    },
    updateRevisedB: (spID,data, callback) =>{
        // var query;
        // var queryArray;
        // if (data.revised_budget!=null ){
        //     query = `update revised_lp_budget set revised_budget=? where sp_bid_id=?`
        //     queryArray = [data.revised_budget,spID]
        // }else if(data.revised_budget!=null){
        //     query = `update revised_lp_budget set revised_budget =? where sp_bid_id=? `
        //     queryArray = [data.revised_budget,spID]
        //   }
        // pool.query(query,
        //     queryArray,

        // (error, results, fields) => {
        //     if(error){
        //         return callback(error);
        //     }
        //     return callback(null, data);
        // }
        // );

        pool.query(`UPDATE revised_lp_budget
        SET revised_budget = ? WHERE sp_bid_id = ?`,
        [data.revised_budget,spID],

        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, data);
        }
        );
    },
    revisedBidByPostId: (id, callback) =>{
        pool.query(`SELECT * FROM revised_lp_budget WHERE idpost_load = ?`, 
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