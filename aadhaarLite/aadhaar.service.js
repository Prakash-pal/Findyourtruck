const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
const axios = require('axios');

module.exports = {
   
    
    getAadhaarDetails: (user_id,aadNo,callback) =>{

      
      pool.query(`SELECT * FROM aadhaarLite WHERE user_id = ?`,
        [user_id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            var resultObj = {};

            console.log(results.length);
            if(results.length == 0){
              var data = JSON.stringify({
                "data": {
                  "customer_aadhaar_number": aadNo,
                  "consent": "Y",
                  "consent_text": "I hear by declare my consent agreement for fetching my information via ZOOP API."
                }
              });
              
              var config = {
                method: 'post',
                url: 'https://test.zoop.one/in/identity/okyc/otp/request',
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
                    pool.query(`insert into aadhaarLite(success,request_id,user_id) values(?,?,?)`,
                  [data.success,data.request_id,(user_id=udid)],
                    (error, results, fields) =>{
                        if(error){
                            console.log("checking values",error);
                            resultObj.isSucess = false;
                            return callback(error);
                        }
                        

                        pool.query(`SELECT * FROM aadhaarLite WHERE user_id = ?`, 
                        [user_id],
                
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
