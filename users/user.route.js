const router = require("express").Router();
require("dotenv").config();
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

const {createUser,getDetailsByPhNo,getAllUsers,getUserDetails, updateUserDetails, getLocationData,getUserDetailsByPhNo,allUsersAsOwner} = require("./user.controller");
//router.post("/create",imageUpload.single('image'), createUser)
router.post("/create", createUser)
router.get("/userDtByPhoneNo/:id", getDetailsByPhNo)
router.get("/get", getAllUsers)
router.get("/:id", getUserDetails)
router.put("/:id", updateUserDetails)
router.get("/locationData/:id", getLocationData)
router.get("/userDetailsBy/:id",getUserDetailsByPhNo)
router.get("/user/userAsOwner",allUsersAsOwner)




router.post('/uploadImage', imageUpload.single('image'), (req, res) => {
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
router.post("/mutliple", imageUpload.array("images", 2),
(req, res)=>{
console.log(req.files);
res.send("data: uploaded");
});

// s3 bucket

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

router.post('/addImages', upload.single('file'), async function (req, res, next) {

  res.send('Successfully uploaded ' + req.file.location + ' location!')

})

router.get("/list", async (req, res) => {

  let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
  let x = r.Contents.map(item => item.Key);
  res.send(x)
})


router.get("/download/:filename", async (req, res) => {
  const filename = req.params.filename
  let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
  res.send(x.Body)
})

router.delete("/delete/:filename", async (req, res) => {
  const filename = req.params.filename
  await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
  res.send("File Deleted Successfully")

})

module.exports = router;
