var bodyParser =require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//connect to database
mongoose.connect('mongodb://test:test@ds031893.mlab.com:31893/todo');

//create a schema - like a blue print
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
/*var itemOne = Todo({item: 'buy flowers'}).save(function(err){
  if (err) throw err;
  console.log('item saved');
});*/
//var data = [{item: 'hello world'}, {item: 'cat'}, {item: 'hat'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app) {

    app.get('/todo', function (req, res) {
        //get data from mongoose db and pass it to view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });
    app.post('/todo', urlencodedParser, function (req, res) {
    /*  data.push(req.body);
      res.render('todo', {todos: data});
      res.json(data);*/
        //get data from view and add it to mongo db
       var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
    app.delete('/todo/:item', function (req, res) {
      /*data = data.filter(function(todo){
        return todo.item.replace(/ /g, '-') !== req.params.item;
      });*/
       //delete the request item from mongo db
        Todo.find({item: req.params.item.replace(/\-/g, "")}).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
};
