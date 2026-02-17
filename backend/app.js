const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PostModel = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://meghab:cVlbI7wy7bmmoKpO@cluster0.h4kbubm.mongodb.net/')
.then(() => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Connection failed!');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post('/api/posts', async (request, response, next) => {
    // const post = request.body;
    const post = new PostModel({
        postTitle: request.body.postTitle,
        postContent: request.body.postContent
    });
    //console.log(post);
    await post.save().then((res) => {
        console.log(res)
        response.status(201).json({
            message: "Post added successfully !!",
            id: res._id
        });
    });
   
});


app.get('/api/posts', (request, response, next) => {
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


app.delete("/api/posts/:id", (req, res, next) => {
  PostModel.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;