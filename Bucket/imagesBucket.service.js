const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');
module.exports = {
    createtk: (data, callback) =>{
        const udid = uuidv4();
        
        (error, results, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        }
    },
}