const express = require("express");
const multer = require("multer");

const PostsController = require("../controllers/posts");

const router = express.Router();
const checkAuth = require('../middleware/check-auth');


const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid){
            error = null;
        }
        cb(null, "backend/images"); //path it takes relative to the server.js file
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];    
        cb(null, name+'-'+Date.now()+'.'+ext); 
    }
});


router.post('', 
    checkAuth, 
    multer({storage:storage}).single("image"), 
    PostsController.addPost
);

router.get('', PostsController.getPost);

router.delete("/:id",  checkAuth,  PostsController.deletePost);

router.put("/:id",
    checkAuth, 
    multer({storage:storage}).single("image"),  
    PostsController.updatePost
    
);

router.get("/:id",  PostsController.getPostById);

module.exports = router;
