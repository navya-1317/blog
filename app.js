const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model('Post', postSchema);

app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    });

    await newPost.save();
    res.json(newPost);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});