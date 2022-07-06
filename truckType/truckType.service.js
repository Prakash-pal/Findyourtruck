const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');

module.exports = {
    createTkType: (data, callback) =>{
        const udid = uuidv4();
        pool.query(`insert into truck_type(vehicle_type_id, vehicle_model, truck_ft, truck_carrying_capacity,body_type) values(?,?,?,?,?)`,
        [(data.vehicle_type_id=udid),data.vehicle_model, data.truck_ft,data.truck_carrying_capacity, data.body_type],
        (error, results, fields) =>{
            if(error){
                return callback(error);
            }
            return callback(null, results);
        }
        );
        
    },
    allTruckTP: (callback) =>{
        pool.query(`SELECT * FROM truck_type;`,
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