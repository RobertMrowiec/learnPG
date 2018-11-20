const multer = require('multer')

export const fileUploadOptions = {
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, `${__dirname}/uploads/`)
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, file.fieldname + '-' + Date.now() + `.${file.mimetype.split('/')[1]}`)
        }
    }),
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 2
    }
};
