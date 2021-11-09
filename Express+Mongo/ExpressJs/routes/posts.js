const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended:false}));

router.get('/new', (req, res)=>{
    res.send('new post form here');
});

router.get('/:id', (req, res)=>{
    res.send('post with id: ' + req.params.id + ' here');
});

module.exports = router;