const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post('/api/posts', (request, response, next) => {
    const post = request.body;
    console.log(post);
    response.status(201).json({
        message: "Post added successfully !!"
    });
});


app.use('/api/posts', (request, response, next) => {
    const posts = [
        {
            id: '1',
            postTitle: 'Post 1',
            postContent: 'Post 1 content'
        },
        {
            id: '2',
            postTitle: 'Post 2',
            postContent: 'Post 2 content'
        },{
            id: '3',
             postTitle: 'Post 3',
            postContent: 'Post 3 content'
        }
    ];
    response.status(200).json({
        message: 'Post fetched successfully',
        posts: posts
    });
});

module.exports = app;