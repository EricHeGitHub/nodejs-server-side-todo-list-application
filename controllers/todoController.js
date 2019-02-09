//var data = [{item:'get milk'}, {item:'walk dog'}, {item: 'coding'}]
var bodyParser = require( 'body-parser')
var urlencoderParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose')
mongoose.connect('mongodb://EricGeek:Nmghjw166*900709@ds127655.mlab.com:27655/nodjs_todo_db')

var todoSchema =  new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema)

// var itemOne = Todo({item: 'get flowers'}).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// })

module.exports = function(app){
  app.get('/todo', (req, res) =>{
    Todo.find({}, function(err,data){
      if(err) throw err;
      res.render('todo', {todos: data});
    })
  })

  app.post('/todo',urlencoderParser, (req, res) =>{
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    })

  })

  app.delete('/todo/:item', (req, res) =>{
    Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
       if(err) throw err;
       res.json(data) //data is the updated model
    })
  })

};
