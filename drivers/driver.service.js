const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
module.exports = {
    createDr: (data, callback) =>{
        const udid = uuidv4();
        // const currDate = new Date().toString();
        const d = new Date,
        currDate = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');
        pool.query(`insert into add_driver(driver_id,user_id,truck_id, driver_name, driver_number,alternate_ph_no, driver_emailId, created_at,is_dl_verified,is_selfie_verified,dl_number,driver_dob) values(?,?,?,?,?,?,?,?,?,?,?,?)`,
        [(data.driver_id=udid),data.user_id,data.truck_id, data.driver_name, data.driver_number,data.alternate_ph_no,data.driver_emailId,(data.created_at=currDate),data.is_dl_verified,data.is_selfie_verified,data.dl_number,data.driver_dob],
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
        var query;
        var queryArray;
        const d = new Date,
        updatedTime = [d.getMonth()+1,
            d.getDate(),
            d.getFullYear()].join('/')+' '+
           [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');
           if (data.truck_id!=null && data.driver_name!=null && data.driver_number!=null && data.alternate_ph_no!=null && data.driver_emailId!=null && data.created_at!=null && data.updated_at!=null && data.updated_by!=null && data.is_dl_verified!=null && data.is_selfie_verified!=null && data.dl_number!=null && data.driver_dob!=null){
               query = `update add_driver set truck_id=?, driver_name=?, driver_number=?,alternate_ph_no, driver_emailId=?, created_at=?,updated_at=?,updated_by=?,is_dl_verified,is_selfie_verified=?,dl_number=?,driver_dob=? where driver_id =?`;
               queryArray = [data.truck_id,data.driver_name,data.driver_number,data.alternate_ph_no,data.driver_emailId,data.created_at,(data.updated_at=updatedTime),data.updated_by,data.is_dl_verified,data.is_selfie_verified,data.dl_number,data.driver_dob,id]
           }else if(data.truck_id!=null){
               query =`update add_driver set truck_id =? where driver_id =?`
               queryArray = [data.truck_id,id]
           }else if(data.driver_name!=null){
               query =`update add_driver set driver_name =? where driver_id =?`
               queryArray = [data.driver_name,id]
           }else if(data.driver_number!=null){
               query =`update add_driver set driver_number =? where driver_id =?`
               queryArray = [data.driver_number,id]
           }else if(data.alternate_ph_no!=null){
            query =`update add_driver set alternate_ph_no =? where driver_id =?`
            queryArray = [data.alternate_ph_no,id]
        } else if(data.driver_emailId!=null){
               query =`update add_driver set driver_emailId =? where driver_id =?`
               queryArray = [data.driver_emailId,id]
           }else if(data.created_at!=null){
               query =`update add_driver set created_at =? where driver_id =?`
               queryArray = [data.created_at,id]
           }else if(data.updated_at!=null){
               query =`update add_driver set updated_at =? where driver_id =?`
               queryArray = [data.updated_at,id]
           }else if(data.updated_by!=null){
               query =`update add_driver set updated_by =? where driver_id =?`
               queryArray = [data.updated_by,id]
           }else if(data.is_dl_verified!=null){
               query =`update add_driver set is_dl_verified =? where driver_id =?`
               queryArray = [data.is_dl_verified,id]
           }else if(data.is_selfie_verified!=null){
               query =`update add_driver set is_selfie_verified =? where driver_id =?`
               queryArray = [data.is_selfie_verified,id]
           }else if(data.dl_number!=null){
            query =`update add_driver set dl_number =? where driver_id =?`
            queryArray = [data.dl_number,id]
        }else if(data.driver_dob!=null){
            query =`update add_driver set driver_dob =? where driver_id =?`
            queryArray = [data.driver_dob,id]
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
    allDrsDt: (callback) =>{
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
    getDrDetailByUserID: (id, callback) =>{
        pool.query(`SELECT * FROM add_driver WHERE user_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },

    getDrDetailByTruck: (id, callback) =>{
        pool.query(`SELECT * FROM add_driver WHERE truck_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    uploadDLAndSelfie: (date,id, callback) =>{
        var dlImage
        var dlFieldname
        if(date.dl!=null){
            dlImage = date.dl[0].location;
            dlFieldname = date.dl[0].fieldname;
        }
        var selfieImg
        var selfieFieldname
        if(date.selfie!=null){
            selfieImg = date.selfie[0].location;
            selfieFieldname = date.selfie[0].fieldname;
        }
       
        var query = ""
        var queryArray = ""

        if(dlFieldname=="dl" && selfieFieldname=="selfie"){
            query = `update add_driver set upload_dl=?, driver_selfie=? where driver_id =?`
            queryArray = [dlImage, selfieImg, id]
        }else if(dlFieldname=="dl"){
            query = `update add_driver set upload_dl=? where driver_id =?`
            queryArray = [dlImage, id]
        }else if(selfieFieldname=="selfie"){
            query = `update add_driver set driver_selfie=? where driver_id =?`
            queryArray = [selfieImg, id]
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
    deletedByAdmin: (id,data, callback) =>{
        var query;
        var queryArray;
        const d = new Date,

        deletedTime = [d.getMonth()+1,
            d.getDate(),
            d.getFullYear()].join('/')+' '+
           [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');
           if (data.deleted_by!=null && data.is_driver_deleted!=null && data.deleted_at!=null){
               query = `update add_driver set deleted_at=?,deleted_by=?,is_driver_deleted where driver_id =?`;
               queryArray = [data.deleted_by,data.is_driver_deleted,(data.deleted_at=deletedTime),id]
           }else if(data.deleted_by!=null){
               query =`update add_driver set deleted_by=?, deleted_at =? where driver_id =?`
               queryArray = [data.deleted_by,deletedTime,id]
           }else if(data.is_driver_deleted!=null){
               query =`update add_driver set is_driver_deleted =? where driver_id =?`
               queryArray = [data.is_driver_deleted,id]
           }
           console.log(queryArray,"inputs")
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
    deleteDriver: (driverId, callback) =>{
        pool.query(`DELETE FROM add_driver WHERE driver_id = ?`,
        [driverId],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },

    isDriverExist: (id, callback) =>{
        pool.query(`SELECT * FROM add_driver WHERE driver_number = ?`,
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