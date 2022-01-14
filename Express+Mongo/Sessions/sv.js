const express = require('express');
const app = express();

// Views Engine
app.set('view engine', 'ejs');
app.set('views', './Sessions/views')


// Routes
app.get('/', (req, res)=>{
    res.render('index.ejs');
});

app.listen(2404);

