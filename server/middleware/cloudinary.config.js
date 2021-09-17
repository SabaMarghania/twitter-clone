const multer = require('multer')

const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: "dgnirmthd",
    api_key:"511649847645787",
    api_secret: "yuSH3205We_JbvLoMa-Fl2OqlHo",
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "myFolder",
        format: async() => "png",
        public_id: (req, file) => file.filename,
    },
})

const parser = multer({ storage: storage})


module.exports = parser