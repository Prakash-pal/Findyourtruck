const router = require("express").Router();

const {createImage, updateImage, getImageByUserId} = require("./image.controller");

const multer = require('multer');
const aws = require('aws-sdk')
const multerS3 = require('multer-s3');


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

// router.post('/addImages', upload.single('file'), async function (req, res, next) {

//     res.send('Successfully uploaded ' + req.file.location + ' location!')

// })


router.post ("/creatImg", createImage);

router.patch ("/updateImage/:user/:type", upload.single('file'), updateImage);
router.get ("/Images/:user", getImageByUserId);
module.exports = router;