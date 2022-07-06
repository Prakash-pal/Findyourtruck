const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
const axios = require('axios');

module.exports = {
   
    
    getVehicleRegistration: (userID, vehNo, callback) =>{
        pool.query(`SELECT * FROM rc_details WHERE rc_registration_number = ?`,
        [vehNo],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            var resultObj = {};

            console.log(results.length);
            if(results.length == 0){
                var data = JSON.stringify({
                    "data": {
                      "vehicle_registration_number": vehNo,
                      "consent": "Y",
                      "consent_text": "RC Lite is Verified by author"
                    }
                  });
                  
                  var config = {
                    method: 'post',
                    url: 'https://test.zoop.one/api/v1/in/vehicle/rc/lite',
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
                    pool.query(`insert into rc_details(rc_id,success, rc_blacklist_status, rc_chassis_no, rc_engine_no, financier,rc_expiry_date,vehicle_fuel_description,insurance_expiry_date,rc_registration_location,vehicle_maker_description,rc_tax_upto,user_name,rc_registration_date,rc_registration_number,rc_status,vehicle_class_description,user_id,created_at) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [(data.rc_id=udid), data.success, data.result.rc_blacklist_status,data.result.rc_chassis_no, data.result.rc_engine_no, data.result.financier,data.result.rc_expiry_date,data.result.vehicle_fuel_description,data.result.insurance_expiry_date,data.rc_registration_location,data.vehicle_maker_description,data.result.rc_tax_upto,data.result.user_name,data.result.rc_registration_date,data.result.rc_registration_number,data.result.rc_status,data.result.vehicle_class_description,userID,(data.created_at=currDate)],
                    (error, results, fields) =>{
                        if(error){
                            console.log("checking values",error);
                            resultObj.isSucess = false;
                            return callback(error);
                        }
                        

                        pool.query(`SELECT * FROM rc_details WHERE rc_registration_number = ?`, 
                        [vehNo],
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

