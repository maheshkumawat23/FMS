var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
//var mongoXlsx = require('mongo-xlsx');
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

var model;
app.use(express.static(__dirname + '/project'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var mongoose = require('mongoose')
mongoose.connect('mongodb://mahesh:mahesh@ds129090.mlab.com:29090/fms', function () {
  console.log('mongodb connected');
})
/*mongoose.connect('mongodb://localhost/tcstravel', function () {
  console.log('mongodb connected')
})*/

var Post = mongoose.model('Post', {
  empId: { type: String, required: true },
  location:{ type: String, required: true },
  Punctuality : { type: String, required: true },
  Ambiance : { type: String, required: true },
  Behaviour: { type: String, required: true },
  Skill: { type: String, required: true },
  Safety : { type: String, required: true },
  water:     { type: String, required: true },
  comments : { type: String},
  date : {type:String, required:true}
 });

app.get('/api/posts', function (req, res) {
  Post.find({},function (err, posts) {
        if (err) { return next(err) }
        res.json(posts);
		//console.log(posts.length);
       // console.log('this is server' + posts);

    });
})
app.post('/api/request', function(req,res,next){
	
	var data = req.body;
	//console.log(data.data.location+","+data.data.vehicleType+","+data.data.from+","+data.data.to);
	 /*Post.find({'date':{ $gte:data.data.from,$lte:data.data.to}},function (err, posts) {
        if (err) { return next(err) }
        res.json(posts);
       // console.log('this is server' + posts);

    });*/
	Post.find({$and :[{'location':data.data.location},{'date':{ $gte:data.data.from,$lte:data.data.to}}]},function (err, posts) {
        if (err) { return next(err) }
        res.json(posts);
       // console.log('this is server' + posts);

    });
	
	
});
app.post('/api/download', function(req,res,next){
	var data = req.body;
    
	//console.log(data.data.location+","+data.data.from+","+data.data.to);
	 Post.find({$and :[{'location':data.data.location},{'date':{ $gte:data.data.from,$lte:data.data.to}}]},function (err, posts) {
        if (err) { return next(err) }
        res.json(posts);
       // console.log('this is server' + posts);

    });
	
});
app.post('/api/posts', function (req, res, next) {
	var data = req.body;
	console.log(data);
	console.log('i am here');
	
	for(var i=0 ;i<data.length;i++){
  var post = new Post({
		  empId: data[i].empId,
		  location: data[i].location,
		  Punctuality : data[i].Punctuality,
		  Ambiance : data[i].Ambiance,
		  Behaviour: data[i].Behaviour,
		  Skill: data[i].Skill,
		  Safety : data[i].Safety,
		  water : data[i].water,
		  comments : data[i].comments,
		  date : data[i].submitDate
 })
 console.log(post);
  //Post.find({}).remove().exec();
  post.save(function (err, post) {
    if (err) { return next(err) }
		console.log("saved");
		
  })
	}
	res.send("OK");
     res.end();
	 
})
/*app.get('/', function (req, res) {
  res.sendfile('index.html');
});
app.listen(3000, function () {
  console.log('Server listening on', 3000)
})*/
app.get('/', function(request, response) {
  response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
