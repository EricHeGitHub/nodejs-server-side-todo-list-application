var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extend: false})

// app.get('/', (req,res) => {res.sendFile(__dirname + '/index.html')})
// app.get('/contact', (req,res) => {res.sendFile(__dirname + '/contact.html')})

app.set('view engine', 'ejs')

// app.use('/assets', function(req, res, next){
//   console.log(req.url)
//   next();
// })

app.use('/assets' ,express.static('assets'));

// app.use('/',function (req, res, next) {
//   console.log(req.url + '2222')
//   next()
// })
// app.get('/', function(req, res){
//   res.render('index')
// })

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/index.html')
})

app.get('/contact', function(req, res){
    res.render('contact', {qs: req.query})
})

app.post('/contact',urlencodedParser,function(req, res){
    console.log(req.body)
    res.render('contact-success',{data: req.body})
})

app.get('/profile/:name', function(req, res){
  var data = {age : 29, job: 'ninja', hobbies: ['eating', 'fighting', 'fishing']}
  res.render('profile', {person: req.params.name, data: data})
})

app.listen(3000);
