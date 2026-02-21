const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
   postTitle: { type: String },
  postContent: { type: String },
  imagePath: {type: String}
});

module.exports = mongoose.model('Post', postSchema);

