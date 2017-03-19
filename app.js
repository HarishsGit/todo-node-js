var express = require('express');
var app = express();
var todocontroller = require('./controllers/todocontroller');

//set up template engine
app.set('view engine','ejs');

//set up static files
app.use(express.static('./public'));

//fire Controllers
todocontroller(app);

//listen to port
app.listen(3000);
console.log('hey are you listening to the port 3000');
