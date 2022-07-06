const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
const {now} = require("moment");
const axios = require('axios');

module.exports = {
    createPlatformCharges: (data, callback)=>{
        const udid = uuidv4();
        // const currDate = new Date().toString();
        const d = new Date,
        currDate = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');
        pool.query(`insert into admin(admin_id,base_platform_fees,platform_fee_one,created_at) values(?,?,?,?)`,
        [(data.admin_id=udid),data.base_platform_fees,data.platform_fee_one,(data.created_at=currDate)],
        (error, results, fields)=>{
            if(error){
                return callback(error);

            }
            return callback (null, results);

        });

    },
    getCharges: (callback) =>{
        pool.query(`SELECT * FROM admin`,

        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    updateCharges: (id,data, callback) =>{
      // const d = new Date,
      //   updatedTime = [d.getMonth()+1,
      //    d.getDate(),
      //    d.getFullYear()].join('/')+' '+
      //   [d.getHours(),
      //    d.getMinutes(),
      //    d.getSeconds()].join(':');
      //   pool.query(`UPDATE admin
      //   SET base_platform_fees = ?, platform_fee_one = ?, company_pan = ?, comp_state = ?,comp_city = ?, comp_zip = ?, comp_add = ?, company_type=?, updated_at=?,updated_by=? WHERE admin_id = ?`,
      //   [data.base_platform_fees,data.platform_fee_one,data.company_pan,data.comp_state,data.comp_city,data.comp_zip,data.comp_add,data.company_type,data.updated_at,data.updated_by,id],

      //   (error, results, fields) => {
      //       if(error){
      //           return callback(error);
      //       }
      //       return callback(null, data);
      //   }
      //   );

        var query;
        var queryArray;
        const d = new Date,
        updatedTime = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');
        if(data.base_platform_fees!=null && data.platform_fee_one!=null &&  data.updated_at!=null && data.updated_by!=null ){
             query = `update admin set base_platform_fees = ?, platform_fee_one = ?, updated_at=?,updated_by=? where admin_id =?`;
             queryArray = [data.base_platform_fees,data.platform_fee_one,updatedTime,data.updated_by,id]
           }else if(data.base_platform_fees!=null){
            query =`update admin set base_platform_fees =? where admin_id =?`
            queryArray = [data.base_platform_fees,id]
          }else if(data.platform_fee_one!=null){
             query =`update admin set platform_fee_one =? where admin_id =?`
             queryArray = [data.platform_fee_one,id]
           }else if(data.updated_by!=null){
            query =`update admin set updated_by =? where admin_id =?`
            queryArray = [data.updated_by,id]
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

}