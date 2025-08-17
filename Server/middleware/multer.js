// import multer from 'multer'

// const upload = multer({
//     storage : multer.diskStorage({})
// })


// export default upload

import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/') // Make sure this directory exists
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });

const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload

// In your route:
