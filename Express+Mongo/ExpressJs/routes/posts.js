const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended:false}));

router.get('/new', (req, res)=>{
    res.render('newPost');
});

const database = require('../database.js');
router.post('/new', (req,res)=>{
    
    let myvar = 123456;
    console.log('my var 1 = ' + myvar);

    myvar = database(req.body);

    console.log('my var 2 ', myvar);

    myvar.then(data=>{
        console.log('data is ', data)
    })

    res.redirect('./new');

});

router.get('/:id', (req, res)=>{
    res.send('post with id: ' + req.params._id + ' here');
});

module.exports = router;