const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
const axios = require('axios');

module.exports = {
   
    
    getAadhaar: (suerID,aadNo,request_id, otp, callback) =>{
        pool.query(`SELECT * FROM aadhaar WHERE aadhaar_no = ?`,
        [aadNo],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            var resultObj = {};

            console.log(results.length);
            if(results.length == 0){
                var data = JSON.stringify({
                    "data": {
                      "request_id": request_id,
                      "otp": otp,
                      "consent": "Y",
                      "consent_text": "I hear by declare my consent agreement for fetching my information via ZOOP API."
                    }
                  });
                  
                  var config = {
                    method: 'post',
                    url: 'https://test.zoop.one/in/identity/okyc/otp/verify',
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
                    pool.query(`insert into aadhaar(aadhaar_id,success, aadhaar_no, user_full_name,user_dob, user_gender, country,dist,state,po,street,house,address_zip,user_id,created_at) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [(data.aadhaar_id=udid), data.success,aadNo,data.result.user_full_name, data.result.user_dob, data.result.user_gender, data.result.user_address.country,data.result.user_address.dist,data.result.user_address.state,data.result.user_address.po,data.result.user_address.street,data.result.user_address.house,data.result.address_zip,suerID,(data.created_at=currDate)],
                    (error, results, fields) =>{
                        if(error){
                            console.log("checking values",error);
                            resultObj.isSucess = false;
                            return callback(error);
                        }
                        

                        pool.query(`SELECT * FROM aadhaar WHERE aadhaar_no = ?`, 
                        [aadNo],
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

