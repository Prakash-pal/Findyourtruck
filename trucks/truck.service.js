const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');

module.exports ={

    createtk: (data, callback) =>{
        const udid = uuidv4();
        pool.query(`insert into add_truck(truck_id,user_id, vehicle_no,isTruck_added) values(?,?,?,?)`,
        [(data.truck_id=udid),data.user_id, data.vehicle_no, data.isTruck_added],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        }
        );
    },
    getTKDetails: (id, callback) =>{
        pool.query(`SELECT * FROM add_truck WHERE truck_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    getTKDetailByUserID: (id, callback) =>{
        pool.query(`SELECT * FROM add_truck WHERE user_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    updateTKDetail: (id,data, callback) =>{
        pool.query(`UPDATE add_truck
        SET vehicle_no = ?, isTruck_added =? WHERE truck_id = ?`,
        [data.vehicle_no,data.isTruck_added,id],

        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, data);
        }
        );
    },

    getAllTK: (callback)=> {
        pool.query(`SELECT * FROM add_truck;`,
        [],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);

        });

    },
}