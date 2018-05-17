var fs = require('fs');
var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');

var contents = fs.readFileSync("servConfig.json"); // lecture synchrone
var jsonContent = JSON.parse(contents);

var dbUrl = jsonContent.db;
var Schema = mongoose.Schema;

mongoose.connect(dbUrl, function(err) {
	if(err) {
		throw err;
	} else {
		console.log("MongoDB a l'adresse " + jsonContent.db);
	}
});

var TaskSchema = Schema({
	_id: String,
	taskName: String,
	done: Boolean,
	user: String
});

var UserSchema = Schema({
	_id: String,
	login: String,
	password: String 
});

var TaskModel = mongoose.model('tasks', TaskSchema);
var UserModel = mongoose.model('users', UserSchema);

module.exports = {
	loginCheck: function(checkData, cb) {
		console.log("Searching " + checkData.login + " " + checkData.password + "...");
		UserModel.findOne({login: checkData.login, password: checkData.password}, function(err, userSet) {
			if(err) throw err;
			console.log("mongo found " + userSet);
			cb(userSet);
		});
	},
	regCheck: function(checkData, cb) {
		console.log("Searching " + checkData.login + " " + checkData.password + "...");
		UserModel.findOne({login: checkData.login}, function(err, userSet) {
			if(err) throw err;

			console.log("mongo found " + userSet);

			if(!userSet) {
				var userSamp = new UserModel({
					_id: uuidv4(),
					login: checkData.login,
					password: checkData.password 
				});
		
				userSamp.save(function(err) {
					if(err) {throw err;}
					cb(true);
				});
			} else {
				cb(false);
			}
		});
	},
	getTaskSet: function(user, cb) {
		// donnees dans le cookie
		console.log("getting " + user.login + " " + user.password + " taskset...")
		UserModel.find({login: user.login, password: user.password}, function(err, userSet) {
			// user "authentifie"
			if(userSet != null) {
				TaskModel.find({user: user.login}, function(err, taskSet) {
					if(err) throw err;
					console.log(user.login + "'s taskset : " + taskSet);
					cb(taskSet);
				});
			}
		});
	},
	addTaskSet: function(task, cb) {
		var taskSamp = new TaskModel({
			_id: uuidv4(),
			taskName: task.name,
			done: false,
			user: task.user
		});

		taskSamp.save(function(err) {
			if(err) {throw err;}
			cb();
		});
	},
	deleteTaskSet: function(task, cb) {
	    TaskModel.remove({_id : task}, function(err) {
	        if(err) {throw err;}
	        cb();
	    });
	},
	saveTaskSet: function(task, cb) {
		console.log("updating " + task.id + " to " + task.done)
	    TaskModel.findOneAndUpdate({_id: task.id}, {done: task.done}, function(err) {
	        if(err) {throw err;}
	        cb();
	    });
	},
};
