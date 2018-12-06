import * as AWS from 'aws-sdk'
import * as multerS3 from 'multer-s3'

AWS.config.update({
    accessKeyId: process.env.AWSAccessKey,
    secretAccessKey: process.env.AWSSecretAccessKey
});

const s3 = new AWS.S3();

export const fileUploadOptions = {
    storage: multerS3({
        s3: s3,
        bucket: process.env.Bucket || 'managepayapp',
        acl: 'public-read',
        metadata: function (req, file, cb) { 
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            cb(null, `${Date.now().toString()}.${file.mimetype.split('/')[1]}`)
        },
        contentType: function (req, file, cb) {
            cb(null, file.mimetype)
        },
        location: function (req, file, cb) {
            cb(null, file.fieldname)
        }
    }),
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 2
    }
}