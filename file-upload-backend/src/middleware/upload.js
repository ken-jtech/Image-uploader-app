const util = require("util");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});


const uploadFile = multer({
  storage: storage,
}).single("file"); 


const uploadFileMiddleware = util.promisify(uploadFile);


module.exports = uploadFileMiddleware;
