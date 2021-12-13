const pool = require("../config/dbconnection");

module.exports = {
    createAcc: (data, callback) =>{
        pool.query(`insert into bank_details(user_id, accountholder_name, account_number,re_enter_acc_num, IFSI_CODE, isBankDetails_Given) values(?,?,?,?,?,?)`,
        [data.user_id, data.accountholder_name, data.account_number, data.re_enter_acc_num, data.IFSI_CODE, data.isBankDetails_Given ],
        (error, results, fields) =>{
            if(error){
                return callback(error);
            }
            return callback(null, results);
        }
        );
        
    },
    getBKDetailsByUserID: (id, callback) =>{
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
}