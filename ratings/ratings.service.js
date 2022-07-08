const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
module.exports = {
    rateAUser: (data, callback)=>{
        const udid = uuidv4();
        const d = new Date,
        updatedTime = [d.getMonth()+1,
            d.getDate(),
            d.getFullYear()].join('/')+' '+
           [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');

        pool.query(`insert into ratings(rating_id,tracking_no,rated_no,ratings_comment,rated_date,user_id,given_by) values(?,?,?,?,?,?,?)`,
        [(data.rating_id=udid),data.tracking_no,data.rated_no,data.ratings_comment,(data.rated_date=updatedTime),data.user_id,data.given_by,],
        (error, results, fields) =>{
            if(error){
                return callback(error);

            }
            return callback(null, results);
        }
        );

    },

    //testing git push
    ratingDTByUserId: (id, callback) =>{
       

        pool.query(`SELECT * FROM ratings WHERE user_id = ?`, 
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
           
            return callback(null, results)
        }
        );
    },
    ratingDTByTsId: (id, callback) =>{
       

        pool.query(`SELECT * FROM ratings WHERE tracking_no = ?`, 
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
           
            return callback(null, results)
        }
        );
    },
    ratingDTByRatedById: (id, callback) =>{
       

        pool.query(`SELECT * FROM ratings WHERE given_by = ?`, 
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
           
            return callback(null, results)
        }
        );
    },
    deleteRatingDTByUserID: (id, callback) =>{
       

        pool.query(`DELETE FROM ratings WHERE given_by = ?`, 
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