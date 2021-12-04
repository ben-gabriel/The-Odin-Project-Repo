const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended:false}));

const {database}= require('../database.js');

router.get('/', (req, res)=>{
    res.redirect('/page/1')
});


router.get('/:pageNumber', (req, res)=>{

    let pageNumber = Number(req.params.pageNumber);
    
    if(pageNumber <= 0 ){
        pageNumber = 1;
    }

    pageNumber = pageNumber - 1;

    database.findManyDocuments(pageNumber).then((postData)=>{
        database.getTotalPosts().then((totalPosts)=>{
            let pageData = {
                totalPages: Math.ceil(totalPosts/5),
                currentPage: pageNumber+1,
            }
            console.log('totalPages = ', pageData.totalPages);
            res.render('index', {postData, pageData});
        });
    });
});

module.exports = router;