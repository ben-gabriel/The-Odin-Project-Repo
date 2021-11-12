const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended:false}));

router.get('/new', (req, res)=>{
    res.render('newPost');
});

const database = require('../database.js');
router.post('/new', (req,res)=>{
    
    let postId = 0;
    let newPost = database(req.body);

    newPost.then(data=>{
        postId = data;
        console.log('postId = ', postId)

        res.redirect('./'+postId);
    })
    

});

router.get('/:id', (req, res)=>{
    // res.send('post with id: ' + req.params.id + ' here');
    let query = Number(req.params.id);

    console.log('log inside get /:id = ', query);

    database({_id: query},1).then((post)=>{
        if(post){
            res.render('singlePost', {post});
        }
        else{
            res.render('404')
        }
    });

});

module.exports = router;