const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";
const url = require('url')

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({
        success: 0,
         message: "Please upload a file!" });
    }

    res.status(200).send({
      success: 1,
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    

    res.status(500).send({
      success: 0,
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  
  const directoryPath = __basedir + "/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      var fileUrl = url.pathToFileURL(directoryPath + file)
      fileInfos.push({
        name: file,
        url: baseUrl + file,
        //bUrl: __basedir + file
      });
    });

    res.status(200).send({
      success: 1,
      message: 'list of images',
      fileInfos
    });
  });
};

const getSingleImage = (req, res) => {

  const fileName = req.params.name;
  const directoryPath = __basedir + "/uploads/";
  let img = fs.readFileSync(directoryPath + fileName);
  res.writeHead(200, {'Content-Type':'image/png'});
  res.end(img, 'binary');
};

module.exports = {
  upload,
  getListFiles,
  getSingleImage
};
