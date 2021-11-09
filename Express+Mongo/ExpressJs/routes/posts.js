const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended:false}));

router.get('/new', (req, res)=>{
    res.render('newPost');
});

const database = require('../database.js');
router.post('/new', (req,res)=>{
    database(req.body);
    res.redirect('/');
});

router.get('/:id', (req, res)=>{
    res.send('post with id: ' + req.params.id + ' here');
});

module.exports = router;