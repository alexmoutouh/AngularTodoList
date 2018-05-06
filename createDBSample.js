var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');

var Schema = mongoose.Schema;

var db = mongoose.connect('mongodb://localhost/myTodoDB', function(err) {
	if(err) {
		throw err;
	} else {
		console.log('mongo Tasks conneted');
	}
});

var TaskSchema = Schema({
	_id: String,
	taskName: String,
    done: Boolean, 
    userID: String
});

var UserSchema = Schema({
    _id: String,
    login: String,
    password: String,
    firstname: String,
    lastname: String
})

var TaskModel = mongoose.model('tasks', TaskSchema);
for(i = 0; i < 50; ++i) {
    var taskSamp = new TaskModel({
        _id: uuidv4(),
        taskName: "task" + i,
        done: false,
        userID: "123"
    });

    taskSamp.save(function(err) {
        if(err) {throw err;}
    });
}

var UserModel = mongoose.model('users', UserSchema);
var userSamp = new UserModel({
    _id: "123",
    login: "login",
    password: "password",
    firstname: "Bob",
    lastname: "Blob"
});

userSamp.save(function(err) {
    if(err) {throw err;}
});
