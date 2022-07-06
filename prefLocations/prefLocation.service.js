const pool = require("../config/dbconnection");

const {v4: uuidv4}= require('uuid');
module.exports = {

    addPrefLocation: (data, callback)=>{
        const udid = uuidv4();
        // const currDate = new Date().toString();
        const d = new Date,
        currDate = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');
pool.query(`insert into preferred_locations(pref_locations_id,user_id,pref_state,pref_city,pref_pin_code,latitude,longitude,created_at) values(?,?,?,?,?,?,?,?)`,
    [(data.pref_locations_id=udid), data.user_id, data.pref_state,data.pref_city,data.pref_pin_code,data.latitude,data.longitude,(data.created_at=currDate)],
        (error, results, fields)=>{
            if(error){
                return callback(error);

            }
            return callback (null, results);

        });

    },
    getPrefDetails: (id, callback) =>{
        pool.query(`SELECT * FROM preferred_locations WHERE user_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    deletePrefDetails: (id, callback) =>{
        pool.query(`DELETE FROM preferred_locations WHERE pref_locations_id = ?`,
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