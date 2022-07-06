const pool = require("../config/dbconnection");
const {v4: uuidv4} = require('uuid');

module.exports = {
    createImg: (data, callback) =>{
        const udid = uuidv4();
        pool.query(`insert into create_image(image_id, user_id, image_type,image_url) values(?,?,?,?)`,
        [(data.image_id=udid),data.user_id, data.image_type, data.image_url ],
        (error, results, fields) =>{
            if(error){
                return callback(error);
            }
            return callback(null, results);
        }
        );
        
    },
    updateImage: (data, userId, imageType, callback) =>{
        console.log("userId.....",userId)
        pool.query(`update create_image set image_url =? where user_id =? AND image_type=?`,
        [data.imageUrl, userId, imageType],
        (error, results, fields) =>{
            if(error){
                return callback(error);
            }
            return callback(null, results);
        }
        );
        
    },
    
    getImageByUserId: (id, callback) =>{
        console.log("id.....",id)
        pool.query(`SELECT * FROM create_image WHERE user_id = ?`,
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