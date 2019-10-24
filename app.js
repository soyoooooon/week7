const express = require('express');
const path = require('path');
const hbs = require('hbs');

// set the port
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
//dont have to put the public path in html
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/index'));
//the slash means go to index foward slash i need to do smth

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})

