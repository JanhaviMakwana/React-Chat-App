const multer = require('multer');
const fs = require('fs');
const dbConfig = require('../config/app.config');
const db = require('../models');

const getFileType = (file) => {
    const mimeType = file.mimetype.split('/');
    return mimeType[mimeType.length - 1];
};

const generateFileName = (req, file, cb) => {
   
    const extention = getFileType(file);
    const filename =  Date.now() + '-' + Math.round(Math.random() * 1E9) + '.'+ extention;
    cb(null, file.fieldname + filename);
};

const fileFilter = (req, file, cb) => {
    const extention = getFileType(file)
    const allowedType = /jpeg|jpg|png/
    const passed = allowedType.test(extention)

    if (passed) {
        return cb(null, true)
    }
    return cb(null, false)
};

exports.imageUpload = ((req, res, next) => {
    
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {

            const { userId } = req.params;
            const dest = `uploads/user/${userId}`

            fs.access(dest, (error) => {
                if(error) {
                    return fs.mkdir(dest, (error) => {
                        cb(error, dest)
                    })
                }else {
                    fs.readdir(dest,(error,files) => {
                        if (error) throw error

                        for(const file of files){
                            fs.unlink(path.join(dest,file), error => {
                                if (error) throw error
                            })
                        }
                    })
                    return cb(null, dest)
                }
            })
        },
        filename: generateFileName
    });
    return multer({ storage, fileFilter }).single('image')
})();