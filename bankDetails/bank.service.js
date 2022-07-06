const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
module.exports = {
    createAcc: (data, callback) =>{
        const udid = uuidv4();
        // const currDate = new Date().toString();
        const d = new Date,
        currDate = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');
        pool.query(`insert into bank_details(bank_id,user_id, accountholder_name, account_number,re_enter_acc_num, IFSI_CODE, bank_name,created_at) values(?,?,?,?,?,?,?,?)`,
        [(data.bank_id=udid),data.user_id, data.accountholder_name, data.account_number, data.re_enter_acc_num, data.IFSI_CODE, data.bank_name,(data.created_at=currDate)],
        (error, results, fields) =>{
            if(error){
                return callback(error);
            }
            return callback(null, results);
        }
        );
        
    },
    updateBKDetail: (id,data, callback) =>{
        // const d = new Date,
        // updatedTime = [d.getMonth()+1,
        //  d.getDate(),
        //  d.getFullYear()].join('/')+' '+
        // [d.getHours(),
        //  d.getMinutes(),
        //  d.getSeconds()].join(':');
        // pool.query(`UPDATE bank_details
        // SET accountholder_name = ?, account_number = ?, re_enter_acc_num=?,IFSI_CODE=?updated_at=?,updated_by=? WHERE user_id = ?`,
        // [data.accountholder_name,data.account_number,data.re_enter_acc_num, data.IFSI_CODE,(data.updated_at=updatedTime),data.updated_by,id],

        // (error, results, fields) => {
        //     if(error){
        //         return callback(error);
        //     }
        //     return callback(null, data);
        // }
        // );
        var query;
        var queryArray;
        const d = new Date,
        updatedTime = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');
        if (data.accountholder_name!=null && data.account_number!=null && data.re_enter_acc_num!=null && data.IFSI_CODE){
            query = `update bank_details set accountholder_name=?, account_number=?, re_enter_acc_num=?, IFSI_CODE=? where user_id =?`
            queryArray = [data.accountholder_name,data.account_number,data.re_enter_acc_num,data.IFSI_CODE,id]
        }else if(data.accountholder_name!=null){
            query = `update bank_details set accountholder_name =? where user_id =?`
            queryArray = [data.accountholder_name,id]
          }else if(data.account_number!=null){
            query =`update bank_details set account_number =? where user_id =?`
            queryArray = [data.account_number,id]
          }else if(data.re_enter_acc_num!=null){
            query =`update bank_details set re_enter_acc_num =? where user_id =?`
            queryArray = [data.re_enter_acc_num,id]
          }else if(data.IFSI_CODE !=null){
              query = `update bank_details set IFSI_CODE =? where user_id =?`
              queryArray =  [data.IFSI_CODE,id]
          }else if(data.bank_name !=null){
            query = `update bank_details set bank_name =? where user_id =?`
            queryArray =  [data.bank_name,id]
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
    bankDetails: (callback)=> {
        pool.query(`SELECT * FROM bank_details;`,
        [],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);

        });

    },
    getBankDeatils: (id, callback) =>{
        pool.query(`SELECT * FROM bank_details WHERE user_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    getBkDetailByBkID: (id, callback) =>{
        pool.query(`SELECT * FROM bank_details WHERE bank_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },

    uploadCheque: (date,id, callback) =>{
        var cancelledImg
        var chequeFieldname
        if(date.cheque!=null){
            cancelledImg = date.cheque[0].location;
            chequeFieldname = date.cheque[0].fieldname;
        }
       
        var query = ""
        var queryArray = ""

        if(chequeFieldname=="cheque"){
            query = `update bank_details set cancelled_cheque=? where bank_id =?`
            queryArray = [cancelledImg, id]
        }
        // else if(chequeFieldname=="cheque"){
        //     query = `update bank_details set cancelled_cheque=? where bank_id =?`
        //     queryArray = [cancelledImg, id]
        // }
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

    updateBKBkId: (id,data, callback) =>{
    
        // pool.query(`UPDATE bank_details
        // SET accountholder_name = ?, account_number = ?, re_enter_acc_num=?,IFSI_CODE=?,updated_at=?,updated_by=? WHERE user_id = ?`,
        // [data.accountholder_name,data.account_number,data.re_enter_acc_num, data.IFSI_CODE,(data.updated_at=updatedTime),data.updated_by,id],

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
        if (data.accountholder_name!=null && data.account_number!=null && data.re_enter_acc_num!=null && data.IFSI_CODE){
            query = `update bank_details set accountholder_name=?, account_number=?, re_enter_acc_num=?, IFSI_CODE=? where bank_id =?`
            queryArray = [data.accountholder_name,data.account_number,data.re_enter_acc_num,data.IFSI_CODE,id]
        }else if(data.accountholder_name!=null){
            query = `update bank_details set accountholder_name =? where bank_id =?`
            queryArray = [data.accountholder_name,id]
          }else if(data.account_number!=null){
            query =`update bank_details set account_number =? where bank_id =?`
            queryArray = [data.account_number,id]
          }else if(data.re_enter_acc_num!=null){
            query =`update bank_details set re_enter_acc_num =? where bank_id =?`
            queryArray = [data.re_enter_acc_num,id]
          }else if(data.IFSI_CODE !=null){
              query = `update bank_details set IFSI_CODE =? where bank_id =?`
              queryArray =  [data.IFSI_CODE,id]
          }else if(data.bank_name !=null){
            query = `update bank_details set bank_name =? where bank_id =?`
            queryArray =  [data.bank_name,id]
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
    deleteBankDetails: (id, callback) =>{
        pool.query(`DELETE FROM bank_details WHERE bank_id = ?`,
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