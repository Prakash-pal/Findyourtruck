const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');

module.exports = {

    create: (data, callback) =>{
        const udid = uuidv4();
        pool.query(`SELECT * FROM users WHERE phone_number = ?`,
        [data.phone_number],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            console.log(results.length);
            if(results.length <= 0){
                
                pool.query(`insert into users(user_id,phone_number, name,  user_type, preferred_location, preferred_language, isRegistration_done, upload_aadhar) values(?,?,?,?,?,?,?,?)`,
                [(data.user_id=udid),data.phone_number, data.name, data.user_type, data.preferred_location,data.preferred_language, data.isRegistration_done,data.upload_aadhar],
                (error, results, fields) => {
                    if(error){
                        return callback(error);
                    }
                    return callback(null, results);
                }
                );
            }else{
                return callback(null, results);
            }
        }
        );
        
    },
    
    getUserDetails: (id, callback) =>{
        pool.query(`SELECT * FROM users WHERE user_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            //return callback(null, results)
            results = results[0];
            //const twotbData = `SELECT* FROM add_truck WHERE user_id = ?; SELECT* FROM add_driver WHERE user_id = ?;`;
            pool.query(`SELECT* FROM add_truck WHERE user_id = ?`,
            //pool.query(twotbData, [1,2],
        [results.user_id],
        (error, tkResults, fields) => {
            if(error){
                return callback(error);
            }
            results.truckdetails = tkResults;
            //return callback(null, results) 
            pool.query(`SELECT* FROM add_driver WHERE user_id = ?`,
            //pool.query(twotbData, [1,2],
        [results.user_id],
        (error, drResults, fields) => {
            if(error){
                return callback(error);
            }
            results.driverdetails = drResults;
        return callback(null, results) 
            
        }
        );
        }
        );
        }
        );
    },
    updateUserDetails: (id,data, callback) =>{
        pool.query(`UPDATE users
        SET name = ?, phone_number = ?, customer_type=?, preferred_location=?, preferred_language=?,isRegistration_done=? WHERE user_id = ?`,
        [data.name,data.phone_number, data.customer_type, data.preferred_location, data.preferred_language, data.isRegistration_done, id],

        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, data);
        }
        );
    },
    getAllUsers: (callback) =>{
        pool.query(`SELECT * FROM users;`,
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