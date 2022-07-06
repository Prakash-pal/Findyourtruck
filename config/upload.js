const truckRouter = require ("express").Router();
const multer = require('multer');
const aws = require('aws-sdk')
const multerS3 = require('multer-s3');

const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: (req, file, cb) =>{
      cb(null, "./images");

  },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
          // file.fieldname is name of the field (image)
          // path.extname get the uploaded file extension
  }
});
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
});

aws.config.update({
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,

});
const BUCKET = process.env.BUCKET
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
      s3: s3,
      acl: "public-read",
      bucket: BUCKET,
      key: function (req, file, cb) {
          console.log(file);
          cb(null, file.originalname)
      }
  })
})





module.exports = upload;