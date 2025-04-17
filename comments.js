// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sample data
let comments = [
    { id: 1, postId: 1, content: 'This is a comment.' },
    { id: 2, postId: 1, content: 'This is another comment.' },
];

// Routes
app.get('/comments', (req, res) => {
    res.json(comments);
});

app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('Comment not found.');
    res.json(comment);
});

app.post('/comments', (req, res) => {
    const { postId, content } = req.body;
    const newComment = {
        id: comments.length + 1,
        postId,
        content,
    };
    comments.push(newComment);
    res.status(201).json(newComment);
});