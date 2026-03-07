const express = require("express");
const multer = require("multer");

const PostModel = require('../models/post');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

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


router.post('', checkAuth, multer({storage:storage}).single("image"), (request, response, next) => {
   
    const url = request.protocol + '://' + request.get("host");
    const post = new PostModel({
        postTitle: request.body.postTitle,
        postContent: request.body.postContent,
        imagePath: url+"/images/"+ request.file.filename,
        creator: request.userData.userId
    });
   
    post.save().then((res) => {
        response.status(201).json({
            message: "Post added successfully !!",
            post: {
                id: res.id,
                postTitle: res.postTitle,
                postContent: res.postContent,
                imagePath: res.imagePath
            }
        });
    }).catch(error => {
        res.status(500).json({
            message: "Creating a post failed!"
        });
    });
   
});


router.get('', (request, response, next) => {

   const pageSize = +request.query.pageSize;
   const currentPage = +request.query.page;

   let postQuery = PostModel.find();
   let fetchedPosts;

   if (pageSize && currentPage) {
      postQuery = postQuery
         .skip(pageSize * (currentPage - 1))
         .limit(pageSize);
   }

   postQuery
   .then((documents) => {
        fetchedPosts = documents;
        return PostModel.countDocuments();
   })
   .then(count => {
    response.status(200).json({
       posts: fetchedPosts,
       maxPosts: count,
       message: "Posts fetched successfully!"
    });
   }).catch(error => {
        res.status(500).json({
            message: "Fetching posts failed!"
        })
   })
});


router.delete("/:id",  checkAuth,  (req, res, next) => {
    PostModel.deleteOne({ _id: req.params.id,creator: req.userData.userId }).then(result => {
        console.log(result);
        if(result.modifiedCount > 0){
            res.status(200).json({ message: "Deletion successful"})
        }else{
            res.status(401).json({ message: "Not Authorized !!"})
        }
   // res.status(200).json({ message: "Post deleted!" });
  }).catch(error => {
        res.status(500).json({
            message: "Fetching posts failed!"
        })
    })
});

router.put("/:id", checkAuth, multer({storage:storage}).single("image"),  (req, res, next) => {
    let imagePath;
    if(req.file){
         const url = req.protocol + '://' + req.get("host");
          imagePath= url+"/images/"+ req.file.filename
    }else{
        imagePath = req.body.imagePath
    }

    const post = new PostModel({
        _id: req.body.id,
        postTitle: req.body.postTitle,
        postContent: req.body.postContent,
        imagePath: imagePath,
         creator: req.userData.userId
    });

      PostModel.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then((response) => {
        console.log(response);
        if(response.modifiedCount > 0){
            res.status(200).json({ message: "Update successful"})
        }else{
            res.status(401).json({ message: "Not Authorized !!"})
        }
        //res.status(200).json({ message: "Update successful"})
    }).catch(error => {
        res.status(500).json({
            message: "Couldn't update post!"
        })
    })
});

router.get("/:id",   (req, res, next) => {
      PostModel.findById(req.params.id).then((post) => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message: 'Fetching post failed!'})
        }
    })
});



module.exports = router;
