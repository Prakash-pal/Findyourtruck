const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
const axios = require('axios');

module.exports = {
    createPan: (data, callback) =>{
        const udid = uuidv4();
        // const currDate = new Date().toString();
        const d = new Date,
        currDate = [d.getMonth()+1,
         d.getDate(),
         d.getFullYear()].join('/')+' '+
        [d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':');
         pool.query(`SELECT * FROM pan_lite WHERE pan_number = ?`,
        [data.pan_number],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            console.log(results.length);
            if(results.length <= 0){
        pool.query(`insert into pan_lite(pan_id,success, response_code, response_message,pan_number, pan_status, user_full_name,request_timestamp,user_id,created_at) values(?,?,?,?,?,?,?,?,?,?)`,
        [(data.pan_id=udid), data.success, data.response_code,data.response_message, data.pan_number, data.pan_status, data.user_full_name,data.request_timestamp,data.user_id,(data.created_at=currDate)],
        (error, results, fields) =>{
            if(error){
                return callback(error);
            }
            return callback(null, results);
        }
        );
    }else{
            return callback(null, results);
        }
    });
    },
    
getPanDt: (userId,panNum, callback) =>{
        pool.query(`SELECT * FROM pan_lite WHERE pan_number = ?`,
        [panNum],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            var resultObj = {};

            console.log(results.length);
            if(results.length == 0){
                var data = JSON.stringify({
                    "data": {
                      "customer_pan_number": panNum,
                      "consent": "Y",
                      "consent_text": "I hear by declare my consent agreement for fetching my information via ZOOP API."
                    }
                  });
                  
                  var config = {
                    method: 'post',
                    url: 'https://test.zoop.one/api/v1/in/identity/pan/lite',
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
                    pool.query(`insert into pan_lite(pan_id,success, response_code, response_message,pan_number, pan_status, user_full_name,request_timestamp,user_id,created_at) values(?,?,?,?,?,?,?,?,?,?)`,
                    [(data.pan_id=udid), data.success, data.response_code,data.response_message, data.result.pan_number, data.result.pan_status, data.result.user_full_name,data.request_timestamp,userId,(data.created_at=currDate)],
                    (error, results, fields) =>{
                        if(error){
                            resultObj.isSucess = false;
                            return callback(error);
                        }
                        

                        pool.query(`SELECT * FROM pan_lite WHERE pan_number = ?`, 
                        [panNum],
                        (error, results, fields) => {
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