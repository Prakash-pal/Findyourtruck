const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
const axios = require('axios');

module.exports = {
   
    
    getDriverlicense: (suerID,dlNo, dob, callback) =>{
        pool.query(`SELECT * FROM driver_lc WHERE dl_number = ?`,
        [dlNo],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            var resultObj = {};

            console.log(results.length);
            if(results.length == 0){
                var data = JSON.stringify({
                    "data": {
                      "customer_dl_number": dlNo,
                      "customer_dob": dob,
                      "consent": "Y",
                      "consent_text": "I hear by declare my consent agreement for fetching my information via ZOOP API"
                    }
                  });
                  
                  var config = {
                    method: 'post',
                    url: 'https://test.zoop.one/api/v1/in/identity/dl/advance?Findyourtruck=2W0KYQ1-RHH49MW-HBDFZP9-AFB6TM0',
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
                    pool.query(`insert into driver_lc(dl_id,success, completeAddress, type,dl_number, expiry_date, father_or_husband,user_full_name,cov,status,user_id,created_at) values(?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [(data.dl_id=udid), data.success, data.result.user_address[0].completeAddress,data.result.user_address[0].type, data.result.dl_number, data.result.expiry_date, data.result.father_or_husband,data.result.user_full_name,data.result.vehicle_category_details[0].cov,data.result.status,suerID,(data.created_at=currDate)],
                    (error, results, fields) =>{
                        if(error){
                            console.log("checking values",error);
                            resultObj.isSucess = false;
                            return callback(error);
                        }
                        

                        pool.query(`SELECT * FROM driver_lc WHERE dl_number = ?`, 
                        [dlNo],
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

