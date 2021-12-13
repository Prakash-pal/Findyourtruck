const router = require("express").Router();
const multer = require('multer');

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

const {createUser,getAllUsers,getUserDetails, updateUserDetails} = require("./user.controller");
router.post("/create",imageUpload.single('image'), createUser)
router.get("/get", getAllUsers)
router.get("/:id", getUserDetails)
router.patch("/:id", updateUserDetails)



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


module.exports = router;
