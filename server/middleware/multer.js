const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/images');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
})

var upload = multer({ storage });

module.exports = upload;