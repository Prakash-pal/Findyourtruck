const pool = require("../config/dbconnection");

const {v4: uuidv4} = require('uuid');

module.exports ={

    createComp: (data, callback)=>{
        const udid = uuidv4();
        // const currDate = new Date().toString();
        const d = new Date,
        currDate = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');
        pool.query(`insert into company_details(company_id,user_id,company_name,company_gst_no,company_pan,comp_state,comp_city,comp_zip,comp_add,company_type,created_at) values(?,?,?,?,?,?,?,?,?,?,?)`,
        [(data.company_id=udid), data.user_id, data.company_name,data.company_gst_no,data.company_pan,data.comp_state,data.comp_city,data.comp_zip,data.comp_add,data.company_type,(data.created_at=currDate)],
        (error, results, fields)=>{
            if(error){
                return callback(error);

            }
            return callback (null, results);

        });

    },
    getCompDetails: (id, callback) =>{
        pool.query(`SELECT * FROM company_details WHERE user_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    updateCompDetail: (id,data, callback) =>{
      // const d = new Date,
      //   updatedTime = [d.getMonth()+1,
      //    d.getDate(),
      //    d.getFullYear()].join('/')+' '+
      //   [d.getHours(),
      //    d.getMinutes(),
      //    d.getSeconds()].join(':');
      //   pool.query(`UPDATE company_details
      //   SET company_name = ?, company_gst_no = ?, company_pan = ?, comp_state = ?,comp_city = ?, comp_zip = ?, comp_add = ?, company_type=?, updated_at=?,updated_by=? WHERE company_id = ?`,
      //   [data.company_name,data.company_gst_no,data.company_pan,data.comp_state,data.comp_city,data.comp_zip,data.comp_add,data.company_type,data.updated_at,data.updated_by,id],

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
        if(data.company_name!=null && data.company_gst_no!=null && data.company_pan!=null && data.comp_state!=null && data.comp_city!=null && data.comp_zip!=null && data.comp_add!=null && data.company_type!=null && data.updated_at!=null && data.updated_by!=null ){
             query = `update company_details set company_name = ?, company_gst_no = ?, company_pan = ?, comp_state = ?,comp_city = ?, comp_zip = ?, comp_add = ?, company_type=?, updated_at=?,updated_by=? where company_id =?`;
             queryArray = [data.company_name,data.company_gst_no,data.company_pan,data.comp_state,data.comp_city,data.comp_zip,data.comp_add,data.company_type,data.updated_at,data.updated_by,id]
           }else if(data.company_name!=null){
            query =`update company_details set company_name =? where company_id =?`
            queryArray = [data.company_name,id]
          }else if(data.company_gst_no!=null){
             query =`update company_details set company_gst_no =? where company_id =?`
             queryArray = [data.company_gst_no,id]
           }else if(data.company_pan!=null){
            query =`update company_details set company_pan =? where company_id =?`
            queryArray = [data.company_pan,id]
          }else if(data.comp_state!=null){
            query =`update company_details set comp_state =? where company_id =?`
            queryArray = [data.comp_state,id]
          }else if(data.comp_city!=null){
            query =`update company_details set comp_city =? where company_id =?`
            queryArray = [data.comp_city,id]
          }else if(data.comp_zip!=null){
            query =`update company_details set comp_zip =? where company_id =?`
            queryArray = [data.comp_zip,id]
          }else if(data.comp_add!=null){
            query =`update company_details set comp_add =? where company_id =?`
            queryArray = [data.comp_add,id]
          }else if(data.company_type!=null){
            query =`update company_details set company_type =? where company_id =?`
            queryArray = [data.company_type,id]
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