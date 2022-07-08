const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
const axios = require ('axios');
const { NEWDATE } = require("mysql/lib/protocol/constants/types");
const { now } = require("moment");

module.exports = {

    create: (data, callback) =>{
       const d = new Date,
       currDate = [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
       [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');
      //  const endTime = new Date()
      //  endTime.setHours(endTime.getHours()+4);

        const udid = uuidv4();
        pool.query(`SELECT * FROM users WHERE phone_number = ?`,
        [data.phone_number],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            console.log(results.length);
            if(results.length <= 0){
                
                pool.query(`insert into users(user_id, name,phone_number,alternate_ph_no, user_type, preferred_location, preferred_language, address,state_code,pin_code,email_id,pay_type,isRegistration_done,isProfile_pic_added,isTruck_added,isDriver_added, isBankDetails_given,isCompany_added,isPersonal_dt_added,is_Addhar_verfied,is_pan_verfied,is_user_verfied, is_account_active,latitude,longitude, created_at,device_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [(data.user_id=udid),data.name, data.phone_number,data.alternate_ph_no,data.user_type,data.preferred_location, data.preferred_language,data.address, data.state_code, data.pin_code,data.email_id,data.pay_type, data.isRegistration_done,data.isProfile_pic_added,data.isTruck_added, data.isDriver_added,data.isBankDetails_given,data.isCompany_added,data.isPersonal_dt_added,data.is_Addhar_verfied,data.is_pan_verfied,data.is_user_verfied,data.is_account_active,data.latitude,data.longitude, (data.created_at=currDate),data.device_id],
                (error, results, fields) => {
                    if(error){
                        return callback(error);
                    }
                    return callback(null, results);
                }
                );
            }else{
                return callback(null, results);
            }
        }
        );
        
    },

    getUserDetailsByPhoneNumber: (id, callback) =>{
     
      pool.query(`SELECT * FROM users WHERE phone_number = ?`,
      [id],
      
      (error, results, fields) => {
        //const obj = Object.fromEntries(entries);
        // const obj = Object.assign({},results);

        //const obj = {... results};
        //const obj= {}

        // for (let i = 0; i < results.length; i++) {
        //   obj[i] = results[i];
      //}
      

          if(error){
              return callback(error);
          }
          return callback(null, results)
      }
      );
    },
    getUserDetails: (id, callback) =>{
        pool.query(`SELECT * FROM users WHERE user_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );

      //   pool.query(`SELECT * FROM users WHERE user_id = ?`,
      //   [id],
      //   (error, results, fields) => {
      //       if(error){
      //           return callback(error);
      //       }
      //       //return callback(null, results)
      //       results = results[0];
      //       //const twotbData = `SELECT* FROM add_truck WHERE user_id = ?; SELECT* FROM add_driver WHERE user_id = ?;`;comment line
      //       pool.query(`SELECT* FROM add_truck WHERE user_id = ?`,
      //       //pool.query(twotbData, [1,2],comment line
      //   [results.user_id],
      //   (error, tkResults, fields) => {
      //       if(error){
      //           return callback(error);
      //       }
      //       results.truckdetails = tkResults;
      //       //return callback(null, results) comment line
      //       pool.query(`SELECT* FROM add_driver WHERE user_id = ?`,
      //       //pool.query(twotbData, [1,2], comment line
      //   [results.user_id],
      //   (error, drResults, fields) => {
      //       if(error){
      //           return callback(error);
      //       }
      //       results.driverdetails = drResults;
      //       pool.query(`SELECT* FROM post_load WHERE user_id = ?`,
      //       //pool.query(twotbData, [1,2], comment line
      //   [results.user_id],
      //   (error, loadPostDt, fields) => {
      //       if(error){
      //           return callback(error);
      //       }
      //       results.postLoadDetail = loadPostDt;



      //   return callback(null, results) 
            
      //   }
      //   );
      //   }
      //   );
      //   }
      //   );
      // }
      // );
    },
    updateUserDetails: (id,data, callback) =>{
      // const updatedTime = new Date().toString();
        var query;
        var queryArray;
        const d = new Date,
         updatedTime = [d.getMonth()+1,
            d.getDate(),
            d.getFullYear()].join('/')+' '+
           [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');
        if(data.name!=null && data.phone_number!=null && data.alternate_ph_no!=null  && data.preferred_location!=null && data.preferred_language!=null && data.address!=null && data.state_code!=null && data.pin_code!=null && data.email_id!=null  && data.isRegistration_done!=null && data.isProfile_pic_added!=null && data.isTruck_added!=null && data.isDriver_added!=null && data.isBankDetails_given!=null && data.isCompany_added!=null && data.isPersonal_dt_added!=null && data.is_Addhar_verfied!=null && data.is_pan_verfied!=null && data.is_user_verfied!=null && data.is_account_active!=null &&data.latitude!=null && data.longitude!=null && data.pan_number!=null && data.aadhaar_number!=null && data.is_self_added_asDriver!=null){
             query = `update users set name=?,phone_number=?,alternate_ph_no=?,preferred_location=?,preferred_language=?,address=?,state_code=?,pin_code=?,email_id=?,isRegistration_done=?,isProfile_pic_added=?,isTruck_added=?,isDriver_added=?,isBankDetails_given=?,isCompany_added=?,isPersonal_dt_added=?,is_Addhar_verfied=?,is_pan_verfied=?,is_user_verfied=?,is_account_active=?,latitude=?,longitude=?,pan_number=?,aadhaar_number=?,is_self_added_asDriver=? where user_id =?`
             queryArray = [data.name,data.phone_number,data.alternate_ph_no,data.preferred_location,data.preferred_language,data.address,data.state_code,data.pin_code,data.email_id,data.isRegistration_done,data.isProfile_pic_added,data.isTruck_added,data.isDriver_added,data.isBankDetails_given,data.isCompany_added,data.isPersonal_dt_added,data.is_Addhar_verfied,data.is_pan_verfied,data.is_user_verfied,data.is_account_active,data.latitude,data.longitude,data.pan_number,data.aadhaar_number,data.is_self_added_asDriver,id]
            }else if(data.name!=null){
            query =`update users set name =?,updated_at=? where user_id =?`
            queryArray = [data.name,id]
          }else if(data.phone_number!=null){
            query =`update users set phone_number =? where user_id =?`
            queryArray = [data.phone_number,id]
          }else if(data.alternate_ph_no!=null){
            query =`update users set alternate_ph_no =? where user_id =?`
            queryArray = [data.alternate_ph_no,id]
          }else if(data.preferred_location!=null){
            query =`update users set preferred_location =? where user_id =?`
            queryArray = [data.preferred_location,id]
          }else if(data.preferred_language!=null){
            query =`update users set preferred_language =? where user_id =?`
            queryArray = [data.preferred_language,id]
          }else if(data.address!=null){
            query =`update users set address =? where user_id =?`
            queryArray = [data.address,id]
          }else if(data.state_code!=null){
            query =`update users set state_code =? where user_id =?`
            queryArray = [data.state_code,id]
          }else if(data.pin_code!=null){
            query =`update users set pin_code =? where user_id =?`
            queryArray = [data.pin_code,id]
          }else if(data.email_id!=null){
            query =`update users set email_id =? where user_id =?`
            queryArray = [data.email_id,id]
          }else if(data.isRegistration_done!=null){
            query =`update users set isRegistration_done =? where user_id =?`
            queryArray = [data.isRegistration_done,id]
          }else if(data.isProfile_pic_added!=null){
            query =`update users set isProfile_pic_added =? where user_id =?`
            queryArray = [data.isProfile_pic_added,id]
          }else if(data.isTruck_added!=null){
            query =`update users set isTruck_added =? where user_id =?`
            queryArray = [data.isTruck_added,id]
          }else if(data.isDriver_added!=null){
            query =`update users set isDriver_added =? where user_id =?`
            queryArray = [data.isDriver_added,id]
          }else if(data.isBankDetails_given!=null){
            query =`update users set isBankDetails_given =? where user_id =?`
            queryArray = [data.isBankDetails_given,id]
          }else if(data.isCompany_added!=null){
            query =`update users set isCompany_added =? where user_id =?`
            queryArray = [data.isCompany_added,id]
          }else if(data.isPersonal_dt_added!=null){
            query =`update users set isPersonal_dt_added =? where user_id =?`
            queryArray = [data.isPersonal_dt_added,id]
          }else if(data.is_Addhar_verfied!=null){
            query =`update users set is_Addhar_verfied =? where user_id =?`
            queryArray = [data.is_Addhar_verfied,id]
          }else if(data.is_pan_verfied!=null){
            query =`update users set is_pan_verfied =? where user_id =?`
            queryArray = [data.is_pan_verfied,id]
          }else if(data.is_user_verfied!=null){
            query =`update users set is_user_verfied =? where user_id =?`
            queryArray = [data.is_user_verfied,id]
          }else if(data.is_account_active!=null){
            query =`update users set is_account_active =? where user_id =?`
            queryArray = [data.is_account_active,id]
          }else if(data.latitude!=null){
            query =`update users set latitude =? where user_id =?`
            queryArray = [data.latitude,id]
          }else if(data.longitude!=null){
            query =`update users set longitude =? where user_id =?`
            queryArray = [data.longitude,id]
          }else if(data.pan_number!=null){
            query =`update users set pan_number =? where user_id =?`
            queryArray = [data.pan_number,id]
          }else if(data.aadhaar_number!=null){
            query =`update users set aadhaar_number =? where user_id =?`
            queryArray = [data.aadhaar_number,id]
          }else if(data.is_self_added_asDriver!=null){
            query =`update users set is_self_added_asDriver =?, updated_at=? where user_id =?`
            queryArray = [data.is_self_added_asDriver,id]
          }
        pool.query(query ,
            queryArray,
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, data);
        }
        );
    },
    getAllUsers: (callback) =>{
        pool.query(`SELECT * FROM users;`,
        [],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
        }
        );
    },
    getLocationData: (id, callback) =>{
      // pool.query(`SELECT * FROM india_pin_code_state WHERE pincode = ?`,
      // [id],
      // (error, results, fields) => {
      //     if(error){
      //         return callback(error);
      //     }
      //     return callback(null, results)
      // }
      // );
      axios({
        url: 'https://findyourtruck-393a4-default-rtdb.asia-southeast1.firebasedatabase.app/indianPinCodes.json?orderBy="pincode"&equalTo="'+id+'"&print=pretty',
        method: "get",
      })
        .then(response => {
          return callback(null, response.data)
        })
        .catch((err) => {
          return callback(err);
        });
  },

  getUserDtByPhoneNo: (id, callback) =>{
   pool.query(`SELECT * FROM users WHERE user_id = ?`,
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            //return callback(null, results)
            results = results[0];
            //const twotbData = `SELECT* FROM add_truck WHERE user_id = ?; SELECT* FROM add_driver WHERE user_id = ?;`;comment line
            pool.query(`SELECT* FROM add_truck WHERE user_id = ?`,
            //pool.query(twotbData, [1,2],comment line
        [results.user_id],
        (error, tkResults, fields) => {
            if(error){
                return callback(error);
            }
            results.truckdetails = tkResults;
            //return callback(null, results) comment line
            pool.query(`SELECT* FROM add_driver WHERE user_id = ?`,
            //pool.query(twotbData, [1,2], comment line
        [results.user_id],
        (error, drResults, fields) => {
            if(error){
                return callback(error);
            }
            results.driverdetails = drResults;

             //Bank deatils
            pool.query(`SELECT* FROM bank_details WHERE user_id = ?`,
            //pool.query(twotbData, [1,2], comment line
        [results.user_id],
        (error, bankDt, fields) => {
            if(error){
                return callback(error);
            }
            results.bankDetails = bankDt;
            
            //company deatils
            pool.query(`SELECT* FROM company_details WHERE user_id = ?`,
            
        [results.user_id],
        (error, compDetails, fields) => {
            if(error){
                return callback(error);
            }
            results.companyDetails = compDetails;

            //preferred_locations deatils
            pool.query(`SELECT* FROM preferred_locations WHERE user_id = ?`,
            
        [results.user_id],
        (error, prefLocations, fields) => {
            if(error){
                return callback(error);
            }
            results.preferredLocations = prefLocations;


         //ratings deatils
         pool.query(`SELECT* FROM ratings WHERE user_id = ?`,
            
         [results.user_id],
         (error, ratings, fields) => {
             if(error){
                 return callback(error);
             }
             results.userRatings = ratings;

             //user avarage rating deatils
             pool.query(`SELECT* FROM ratings WHERE user_id = ?`,

             [results.user_id],
        (error, ratings, fields) => {
            if(error){
                return callback(error);
            }
            
            var averageSum = 0;
            for(var i=0; i<ratings.length; i++){
                console.log(ratings[i].rated_no)
                averageSum += parseInt(ratings[i].rated_no);
            }
            var average = averageSum/ratings.length
            average =  (Math.round(average * 100) / 100).toFixed(1);
            results.avRating = average;



           
            //images deatils
            pool.query(`SELECT* FROM create_image WHERE user_id = ?`,
            
        [results.user_id],
        (error, userImg, fields) => {
            if(error){
                return callback(error);
            }
            results.userImages = userImg;

            

        //     //post_load deatils
        //     pool.query(`SELECT* FROM post_load WHERE user_id = ?`,
            
        // [results.user_id],
        // (error, loadPostDt, fields) => {
        //     if(error){
        //         return callback(error);
        //     }
        //     results.postaLoadDetails = loadPostDt;

        //     //sp_bid_details deatils
        //     pool.query(`SELECT* FROM sp_bid_details WHERE user_id = ?`,
            
        // [results.user_id],
        // (error, spBidDt, fields) => {
        //     if(error){
        //         return callback(error);
        //     }
        //     results.spBidDetails = spBidDt;




        return callback(null, results) 
            
        }
        );
        }
        );
        }
        );
      }
      );
    }
    );
    }
    );
    }
    );
    }
    );
    }
    );
    },
    // );
    // }
    // );
    // }
  
//////////////////////////// admin ////////////////
    allUsersRoleAsTruckOwner: (callback) =>{
      pool.query(`SELECT * FROM users WHERE user_type = "Owner";`,
      [],
      (error, results, fields) => {
          if(error){
              return callback(error);
          }
          return callback(null, results)
      }
      );
  },
}