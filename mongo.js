var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/todo', function(err) {
	if(err) {
		throw err;
	} else {
		console.log('mongo conneted');
	}
});

var TaskSchema = Schema({
	_id: String,
	taskName: String,
	done: Boolean 
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
		UserModel.findOne({login: checkData.login, password: checkData.password}, function(err, userSet) {
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
					cb(userSet);
				});
			}
		});
	},
	getTaskSet: function(cb) {
		TaskModel.find(null, function(err, taskSet) {
			if(err) throw err;
			cb(taskSet);
		});
	},
	addTaskSet: function(taskName, cb) {
		var taskSamp = new TaskModel({
			_id: uuidv4(),
			taskName: taskName,
			done: false
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
	saveTaskSet: function(taskId, cb) {
	    TaskModel.findOneAndUpdate({_id: taskId}, {done: true}, function(err) {
	        if(err) {throw err;}
	        cb();
	    });
	},
};
