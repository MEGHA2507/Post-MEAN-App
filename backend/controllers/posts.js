

const PostModel = require('../models/post');


exports.getPost = (request, response, next) => {

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
}

exports.getPostById = (req, res, next) => {
      PostModel.findById(req.params.id).then((post) => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message: 'Fetching post failed!'})
        }
    })
}

exports.addPost = (request, response, next) => {
   
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
   
}

exports.deletePost = (req, res, next) => {
    PostModel.deleteOne({ _id: req.params.id,creator: req.userData.userId }).then(result => {
        console.log(result);
        if(result.deletedCount > 0){
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
}

exports.updatePost = (req, res, next) => {
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
}
