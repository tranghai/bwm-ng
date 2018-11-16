const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config');

aws.config.update({
    secretAccessKey: config.secretAccessKey,
    accessKeyId: config.accessKeyId,
    region: 'us-east-1'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cd) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
}   

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'bwm-ng-dev',
    acl: 'public-read',
    fileFilter: fileFilter,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;