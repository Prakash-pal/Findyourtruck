const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');

module.exports ={

    createtk: (data, callback) =>{
        const udid = uuidv4();
        // const currDate = new Date().toString();
        const d = new Date,
       currDate = [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
       [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');
        pool.query(`insert into add_truck(truck_id,user_id,driver_id,vehicle_no,truck_type,vehicle_type,truck_ft,truck_carrying_capacity,created_at,is_rc_verified,is_insurance_verified) values(?,?,?,?,?,?,?,?,?,?,?)`,
        [(data.truck_id=udid),data.user_id,data.driver_id,data.vehicle_no,data.truck_type, data.vehicle_type,data.truck_ft,data.truck_carrying_capacity,(data.created_at=currDate),data.is_rc_verified,data.is_insurance_verified],
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
    updateTKDetail: (id,data, callback) =>{
        // pool.query(`UPDATE add_truck
        // SET vehicle_no = ?WHERE truck_id = ?`,
        // [data.vehicle_no,id],

        // (error, results, fields) => {
        //     if(error){
        //         return callback(error);
        //     }
        //     return callback(null, data);
        // }
        // );
        const d = new Date,
       updatedTime = [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
       [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');
        var query;
        var queryArray;
        if (data.vehicle_no!=null && data.truck_type!=null && data.vehicle_type!=null && data.truck_carrying_capacity!=null && data.truck_ft!=null && data.driver_id!=null && data.is_rc_verified!=null && is_insurance_verified!=null && data.updated_at!=null && data.updated_by!=null){
            query = `update add_truck set vehicle_no=?,truck_type=?,vehicle_type=?, truck_carrying_capacity=?, truck_ft=?, driver_id=?,is_rc_verified=?,is_insurance_verified=?, updated_at=?,updated_by=? where truck_id =?`
            queryArray = [data.vehicle_no,data.truck_type,data.vehicle_type,data.truck_carrying_capacity,data.truck_ft,data.driver_id,data.is_rc_verified,data.is_insurance_verified,(data.updated_at=updatedTime),data.updated_by,id]
        }
        else if(data.vehicle_no!=null){
            query = `update add_truck set vehicle_no =? where truck_id =?`
            queryArray = [data.vehicle_no,id]
          }else if(data.truck_type!=null){
            query =`update add_truck set truck_type =? where truck_id =?`
            queryArray = [data.truck_type,id]
          }else if(data.vehicle_type!=null){
            query =`update add_truck set vehicle_type =? where truck_id =?`
            queryArray = [data.vehicle_type,id]
          }else if (data.truck_carrying_capacity!=null){
              query = `update add_truck set truck_carrying_capacity=? where truck_id =?`
              queryArray = [data.truck_carrying_capacity,id]
          }else if(data.truck_ft !=null){
            query = `update add_truck set truck_ft =? where truck_id =?`
            queryArray =  [data.truck_ft,id]
        }else if (data.driver_id!=null){
            query = `update add_truck set driver_id=? where truck_id =?`
            queryArray = [data.driver_id,id]
        }else if (data.is_rc_verified!=null){
            query = `update add_truck set is_rc_verified=? where truck_id =?`
            queryArray = [data.is_rc_verified,id]
        }else if (data.is_insurance_verified!=null){
            query = `update add_truck set is_insurance_verified=? where truck_id =?`
            queryArray = [data.is_insurance_verified,id]
        }
        else if (data.updated_at!=null){
            query = `update add_truck set updated_at=? where truck_id =?`
            queryArray = [data.updated_at,id]
        }
        else if (data.is_insurance_verified!=null){
            query = `update add_truck set is_insurance_verified=? where truck_id =?`
            queryArray = [data.is_insurance_verified,id]
        }
        console.log(query, "update query");
        console.log(queryArray, "updating Values");
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
    getTruckDetailsByUDID: (id, callback) =>{
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
    uploadRCnInsurence: (data,id, callback) =>{
        var rcImg
        var rcFieldname
        if(data.rc!=null){
            rcImg = data.rc[0].location;
            rcFieldname = data.rc[0].fieldname;
        }
        var insurenceImg
        var insurenceFieldname
        if(data.insurence!=null){
            insurenceImg = data.insurence[0].location;
            insurenceFieldname = data.insurence[0].fieldname;
        }
       
        var query = ""
        var queryArray = ""

        if(rcFieldname=="rc" && insurenceFieldname=="insurence"){
            query = `update add_truck set rc_book=?, vehicle_insurance=? where truck_id =?`
            queryArray = [rcImg, insurenceImg, id]
        }else if(rcFieldname=="rc"){
            query = `update add_truck set rc_book=? where truck_id =?`
            queryArray = [rcImg, id]
        }else if(insurenceFieldname=="insurence"){
            query = `update add_truck set vehicle_insurance=? where truck_id =?`
            queryArray = [insurenceImg, id]
        }
        console.log(query,queryArray )
        pool.query(query,
            queryArray,

        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        }
        );
    },

    deleteTruckDetails: (id, callback) =>{
        pool.query(`DELETE FROM add_truck WHERE truck_id = ?`,
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