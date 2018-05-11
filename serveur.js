// argv[0] : node
// 1 : serveur.js
// 2 : port
if(process.argv.length < 3) {
	console.log("ERREUR : nombre d'arguments invalide.");
	console.log("Usage : node " + process.argv[1] + " <port>");

	return 1;
}

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

var port = process.argv[2];
var userID = null;
var connections = [];
var findCo = function(user, pass) {
	for(var i = 0; i < connections.length; ++i) {
		if(connections[i].user == user && connections[i].password == pass) {
			return {index: i, co: connections[i]};
		}
	}

	return null;
}

app.post('/login', function(req, res) {
	console.log("Trying login " + req.body.login + " " + req.body.password + "... ");
	dataTaskLayer.loginCheck(req.body, function(user) {
		console.log("Found " + user);
		if(user != null) {
			console.log("login success");
			userID = user.login;
			connections.push({
				user: user.login, 
				password: user.password, 
			});
			var obj = {
				success: true
			};
			res.send(obj);
		} else {
			console.log("login fail");
			var obj = {
				success: false,
				msgError: "Mauvais login ou mot de passe"
			};
			res.send(obj);
		}
	});
});

app.post('/register', function(req, res) {
	dataTaskLayer.regCheck(req.body, function(success) {
		console.log("Registering " + req.body.login + " " + req.body.password + "... ");
		if(!success) {
			console.log("Found : " + success + "fail");
			var obj = {
				success: false
			};
		} else {
			console.log("Found " + success + "success");
			var obj = {
				success: true
			};
		}

		res.send(obj);
	});
});

app.post('/logout', function(req, res) {
	var co = findCo(req.body.username, req.body.passwd);
	if(co) {
		connections.splice(co.index, 1);
		res.send({url: '/'});
	}
});

app.post('/getTaskSet', function(req, res) {
	dataTaskLayer.getTaskSet(req.body.user, function(taskSet) {	
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
		if(!req.body.user) {
			res.send({ 
				success: false, 
				errorSet: ['UNKNOWN_USER']
			});
		} else {
			var userTask = {
				name: req.body.name,
				done: false,
				user: req.body.user.username
			}
			dataTaskLayer.addTaskSet(userTask, function() {
				var task = {
					_id : uuidv4(),
					taskName : req.body.name,
					done: false
				};
	
				res.send({success: true});
			});
		}
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
