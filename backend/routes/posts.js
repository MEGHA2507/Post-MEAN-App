const express = require("express");
const multer = require("multer");


const PostModel = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (rq, file, cb) => {
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


router.post('', multer({storage:storage}).single("image"), (request, response, next) => {
    // const post = request.body;
    const url = request.protocol + '://' + request.get("host");
    const post = new PostModel({
        postTitle: request.body.postTitle,
        postContent: request.body.postContent,
        imagePath: url+"/images/"+ request.file.filename
    });
    //console.log(post);
      post.save().then((res) => {
        console.log(res)
        response.status(201).json({
            message: "Post added successfully !!",
            post: {
                id: res.id,
                postTitle: res.postTitle,
                postContent: res.postContent,
                imagePath: res.imagePath
            }
        });
    });
   
});


router.get('', (request, response, next) => {
    // const posts = [
    //     {
    //         id: '1',
    //         postTitle: 'Post 1',
    //         postContent: 'Post 1 content'
    //     },
    //     {
    //         id: '2',
    //         postTitle: 'Post 2',
    //         postContent: 'Post 2 content'
    //     },{
    //         id: '3',
    //          postTitle: 'Post 3',
    //         postContent: 'Post 3 content'
    //     }
    // ];
      PostModel.find().then((result)=> {
        //console.log(result);

        response.status(200).json({
            message: 'Post fetched successfully',
            posts: result
        });
    });

   
});


router.delete("/:id",   (req, res, next) => {
    PostModel.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

router.put("/:id",   (req, res, next) => {
    const post = new PostModel({
        _id: req.body.id,
        postTitle: req.body.postTitle,
        postContent: req.body.postContent
    });

      PostModel.updateOne({_id: req.params.id}, post).then((response) => {
        console.log(response);
        res.status(200).json({ message: "Update successful"})
    })
});

router.get("/:id",   (req, res, next) => {
      PostModel.findById(req.params.id).then((post) => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message: 'Post not found!!'})
        }
    })
});



module.exports = router;
