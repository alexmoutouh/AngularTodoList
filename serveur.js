var path = require('path');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var uuidv4 = require('uuid/v4');
var dataTaskLayer = require('./mongo.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

var taskSet = [];
var port = 8092;
var userID = "no user";

app.post('/login', function(req, res) {
	console.log("Trying login " + req.body.login + " " + req.body.password + "... ");
	dataTaskLayer.loginCheck(req.body, function(user) {
		console.log("Found " + user);
		if(user != null) {
			console.log("login success");
			userID = user.login;
			var obj = {
				success: true
			};
		} else {
			console.log("login fail");
			var obj = {
				success: false,
				msgError: "Mauvais login ou mot de passe"
			};
		}

		res.send(obj);
	});
});

app.post('/register', function(req, res) {
	dataTaskLayer.regCheck(req.body, function(user) {
		console.log("Registering " + req.body.login + " " + req.body.password + "... ");
		if(user != null) {
			console.log("Found " + user + "fail");
			var obj = {
				success: false
			};
		} else {
			console.log("Found " + user + "success");
			var obj = {
				success: true
			};
		}

		res.send(obj);
	});
});

app.post('/getUser', function(req, res) {
	console.log("getUser : " + userID);
	var obj = {
		user: userID
	};
	res.send(obj);
});

app.post('/getTaskSet', function(req, res) {
	dataTaskLayer.getTaskSet(function(taskSet) {	
		var obj = {
			success: true,
			taskSet: taskSet
		};

		res.send(obj);
	});
});

app.post('/addTask', function(req, res) {
	if(!req.body.name) {
		res.send({ 
			success: false, 
			errorSet: ['TASKNAME_EMPTY']
		});
	} else {
		dataTaskLayer.addTaskSet(req.body.name, function() {
/*			var obj = {
				success: true,
				taskSet: taskSet
			};

			res.send(obj);*/

			var task = {
				_id : uuidv4(),
				taskName : req.body.name,
				done: false
			};
	
			taskSet.push(task);
			res.send({success: true});
		});
	}
});

app.post('/deleteTask', function(req, res) {
    if(!req.body.id) {
		res.send({
			success: false,
			errorSet: ['TASKNAME_EMPTY']
		});
	} else {
	    dataTaskLayer.deleteTaskSet(req.body.id, function () {
	        res.send({success: true});
	    });
	}
});

app.post('/saveTaskSet', function(req, res) {
    if(!req.body.id) {
        res.send({
			success: false,
			errorSet: ['TASKNAME_EMPTY']
		});
    } else {
        dataTaskLayer.saveTaskSet(req.body.id, function () {
            res.send({success: true});
        });
    }
});

app.listen(port);
console.log('server start port : ' + port);
