const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
module.exports = {
    createDr: (data, callback) =>{
        const udid = uuidv4();
        pool.query(`insert into add_driver(driver_id,user_id, driver_name, driver_number,isDriver_added) values(?,?,?,?,?)`,
        [(data.driver_id=udid),data.user_id, data.driver_name, data.driver_number, data.isDriver_added],
        (error, results, fields) =>{
            if(error){
                return callback(error);
            }
            return callback(null, results);
        }
        );
        
    },
    getDrDetails: (id, callback) =>{
        pool.query(`SELECT * FROM add_driver WHERE driver_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    updateDrDetail: (id,data, callback) =>{
        pool.query(`UPDATE add_driver
        SET driver_name = ?, driver_number = ?, isDriver_added = ? WHERE driver_id = ?`,
        [data.driver_name,data.driver_number,data.isDriver_added,id],

        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, data);
        }
        );
    },
    getAllDrs: (callback) =>{
        pool.query(`SELECT * FROM add_driver;`,
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