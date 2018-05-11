var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');

var Schema = mongoose.Schema;

var db = mongoose.connect('mongodb://localhost/todo', function(err) {
	if(err) {
		throw err;
	} else {
		console.log('mongo Tasks conneted');
	}
});

var cpt = 0;

var TaskSchema = Schema({
	_id: String,
	taskName: String,
    done: Boolean, 
    userID: String
});
var TaskModel = mongoose.model('tasks', TaskSchema);
var createTask = function() {
    var taskSamp = new TaskModel({
        _id: uuidv4(),
        taskName: "task" + cpt++,
        done: false,
        userID: "123"
    });

    taskSamp.save(function(err) {
        if(err) {throw err;}
        if(cpt == 50) {
            console.log('done');
            process.exit(0);
        } else {
            createTask();
        }
    });
}

var UserSchema = Schema({
    _id: String,
    login: String,
    password: String,
    firstname: String,
    lastname: String
})
var UserModel = mongoose.model('users', UserSchema);
var userSamp = new UserModel({
    _id: "123",
    login: "login",
    password: "password",
    firstname: "Bob",
    lastname: "Bob"
});

userSamp.save(function(err) {
    if(err) {throw err;}
    createTask();
});
