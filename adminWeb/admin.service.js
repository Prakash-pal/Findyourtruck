const pool = require("../config/dbconnection");

module.exports = {
  getTruckowners: (userType, callback) => {
    pool.query(`SELECT * FROM users where user_type=?;`,
      [userType],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results)
      }
    );
  },
  getTruckownersByUserId: (id, callback) => {
    pool.query(`SELECT * FROM users WHERE user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        results = results[0];
        pool.query(`SELECT* FROM add_truck WHERE user_id = ?`,
          [results.user_id],
          (error, tkResults, fields) => {
            if (error) {
              return callback(error);
            }
            results.truckdetails = tkResults;
            pool.query(`SELECT* FROM add_driver WHERE user_id = ?`,
              [results.user_id],
              (error, drResults, fields) => {
                if (error) {
                  return callback(error);
                }
                results.driverdetails = drResults;

                pool.query(`SELECT* FROM bank_details WHERE user_id = ?`,
                  [results.user_id],
                  (error, bankDt, fields) => {
                    if (error) {
                      return callback(error);
                    }
                    results.bankDetails = bankDt;
                    pool.query(`SELECT* FROM company_details WHERE user_id = ?`,

                      [results.user_id],
                      (error, compDetails, fields) => {
                        if (error) {
                          return callback(error);
                        }
                        results.companyDetails = compDetails;
                        pool.query(`SELECT* FROM preferred_locations WHERE user_id = ?`,

                          [results.user_id],
                          (error, prefLocations, fields) => {
                            if (error) {
                              return callback(error);
                            }
                            results.preferredLocations = prefLocations;

                            //ratings deatils
                            pool.query(`SELECT* FROM ratings WHERE user_id = ?`,

                              [results.user_id],
                              (error, ratings, fields) => {
                                if (error) {
                                  return callback(error);
                                }

                                var averageSum = 0;
                                for (var i = 0; i < ratings.length; i++) {
                                  console.log(ratings[i].rated_no)
                                  averageSum += parseInt(ratings[i].rated_no);
                                }
                                var average = averageSum / ratings.length
                                average = (Math.round(average * 100) / 100).toFixed(1);
                                results.userRatings = average;

                                //images deatils
                                pool.query(`SELECT* FROM create_image WHERE user_id = ?`,

                                  [results.user_id],
                                  (error, userImg, fields) => {
                                    if (error) {
                                      return callback(error);
                                    }
                                    results.userImages = userImg;






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
  },
  updateUserDetails: (id, data, callback) => {
    var query = ""
    var queryArray = []
    if (data.isActiveClick == 0) {
      query = "update users set alternate_ph_no =?, email_id=?, aadhaar_number =?,  pan_number =?, is_Addhar_verfied =?, is_pan_verfied =? where user_id =?"
      queryArray = [data.alternate_ph_no, data.email_id, data.aadhaar_number, data.pan_number, data.is_Addhar_verfied, data.is_pan_verfied, id]
    } else {
      query = "update users set is_account_active =? where user_id =?"
      queryArray = [data.is_account_active, id]
    }

    console.log(queryArray)
    console.log("data.....", data)

    pool.query(query,
      queryArray,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, data);
      }
    );
  },
  deleteUserDetails: (id, callback) => {
    pool.query(`DELETE FROM users WHERE user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results)
      }
    );
  },
  updateTruckownersByCompanyDetails: (id, data, callback) => {
    var query = "update company_details set company_gst_no =?, company_pan=? where company_id =?"
    var queryArray = [data.company_gst_no, data.company_pan, id]
    console.log(queryArray)

    pool.query(query,
      queryArray,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, data);
      }
    );
  },
  updateBankDetails: (id, data, callback) => {
    var query = "update bank_details set bank_name =?, account_number=?, IFSI_CODE=? where bank_id =?"
    var queryArray = [data.bank_name, data.account_number, data.IFSI_CODE, id]
    pool.query(query,
      queryArray,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, data);
      }
    );
  },
  updateDriverDetails: (id, data, callback) => {
    var query = "update add_driver set alternate_ph_no =?, dl_number=?, is_dl_verified=? where driver_id =?"
    var queryArray = [data.alternate_ph_no, data.dl_number, data.is_dl_verified, id]
    pool.query(query,
      queryArray,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, data);
      }
    );
  },
  updateTruckDetails: (id, data, callback) => {
    var query = "update add_truck set vehicle_no =?, truck_type=?, truck_carrying_capacity=? where truck_id =?"
    var queryArray = [data.vehicle_no, data.truck_type, data.truck_carrying_capacity, id]
    console.log("truck.....", queryArray)
    pool.query(query,
      queryArray,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, data);
      }
    );
  },
  getTruckOwnerDetailsByUserId: (id, callback) => {
    var finalResult = {}

    pool.query(`SELECT * FROM post_a_trip WHERE user_id = ?`,
      [id],
      (error, results1, fields) => {
        console.log(error)
        if (error) {
          return callback(error);
        }
        console.log(results1)
        if(results1!=null){
          finalResult["totalTrips"] = results1.length
        }
        
        pool.query(`SELECT * FROM add_truck WHERE user_id = ?`,
          [id],
          (error, results2, fields) => {
            if (error) {
              return callback(error);
            }
            if(results2!=null){
              finalResult["totalTrucks"] = results2.length
            }
            
            pool.query(`SELECT * FROM add_driver WHERE user_id = ?`,
              [id],
              (error, results3, fields) => {
                if (error) {
                  return callback(error);
                }
                if(results3!=null){
                  finalResult["totalDrivers"] = results3.length
                }
                return callback(null, finalResult)
              }
            )
          }
        )
      }
    )
  },
  getAllLoadBids: (callback) => {
    pool.query(`SELECT *, users.name, users.phone_number FROM post_load INNER JOIN users ON users.user_id=post_load.user_id;`,
    [],
    (error, results1, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results1)
    }
  );
  },
  getAllLoadBidsByLoadId: (id, callback) => {
    pool.query(`SELECT *, users.name, users.phone_number FROM post_load INNER JOIN users ON users.user_id=post_load.user_id where idpost_load=?;`,
    [id],
    (error, results1, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results1)
    }
  );
  },
  getAllBidRespondLoadId: (id, callback) => {
    var q = 'SELECT *, users.name, users.phone_number FROM sp_bid_details INNER JOIN users ON users.user_id=sp_bid_details.user_id where idpost_load=?;';
    pool.query(`SELECT *, users.name, users.phone_number, users.user_type FROM sp_bid_details INNER JOIN users ON users.user_id=sp_bid_details.user_id where idpost_load=?;`,
    [id],
    (error, results1, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results1)
    }
  );
  }
}