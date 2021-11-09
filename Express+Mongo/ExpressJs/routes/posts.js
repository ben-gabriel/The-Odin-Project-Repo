const express = require('express');
const router = express.Router();

router.get('/post/:id', (req, res)=>{
    res.send('post with id: ' + req.body.id + 'here');
});

router.get('/post/new', (req, res)=>{
    res.send('new post form here');
});