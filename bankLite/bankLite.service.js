const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
const axios = require('axios');

module.exports = {
   
    
    getBankDetails: (userID,accNo, ifsc, callback) =>{
        pool.query(`SELECT * FROM bank_verification WHERE account_no = ?`,
        [accNo],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            var resultObj = {};

            console.log(results.length);
            if(results.length == 0){
                var data = JSON.stringify({
                    "data": {
                      "account_number": accNo,
                      "ifsc": ifsc,
                      "consent": "Y",
                      "consent_text": "I hear by declare my consent agreement for fetching my information via ZOOP API"
                    }
                  });
                  
                  var config = {
                    method: 'post',
                    url: 'https://test.zoop.one/api/v1/in/financial/bav/lite',
                    headers: { 
                      'app-id': '61d9a5a590d054001d2a3941', 
                      'api-key': '2W0KYQ1-RHH49MW-HBDFZP9-AFB6TM0', 
                      'Content-Type': 'application/json'
                    },
                    data : data
                  };
                  
                  axios(config)
                  .then(function (response) {
                    var data =response.data;
                    if(data.result ==null){
                        resultObj.isSucess = false;
                        return callback(null, resultObj);
                    }
                    const udid = uuidv4();
                    // const currDate = new Date().toString();
                    const d = new Date,
                    currDate = [d.getMonth()+1,
                     d.getDate(),
                     d.getFullYear()].join('/')+' '+
                    [d.getHours(),
                     d.getMinutes(),
                     d.getSeconds()].join(':');
                    console.log(JSON.stringify(response.data));
                    pool.query(`insert into bank_verification(bank_ver_id,success,account_no,ifsc_no, bank_ref_no, beneficiary_name, transaction_remark, verification_status,user_id,created_at) values(?,?,?,?,?,?,?,?,?,?)`,
                    [(data.bank_ver_id=udid), data.success,accNo,ifsc, data.result.bank_ref_no,data.result.beneficiary_name, data.result.transaction_remark, data.result.verification_status,userID,(data.created_at=currDate)],
                    (error, results, fields) =>{
                        if(error){
                            console.log("checking values",error);
                            resultObj.isSucess = false;
                            return callback(error);
                        }
                        

                        pool.query(`SELECT * FROM bank_verification WHERE account_no = ?`, 
                        [accNo],
                
                        (error, results, fields) => {
                            console.log("6766",results);
                            if(error){
                                return callback(error);
                            }
                            resultObj.isSucess = true;
                            resultObj.results= results
                            return callback(null, resultObj);
                        }
                        );

                        
                    }
                    );
                    //return callback(null, data);
                  })
                  .catch(function (error) {
                    resultObj.isSucess = false;
                    console.log("checking values",error);

                    return callback(null, resultObj);
                    
                  });
        
    }else{
        resultObj.isSucess = true;
        resultObj.results= results
        return callback(null, resultObj);
    }
  });
    },
}

