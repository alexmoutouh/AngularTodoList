var fs = require('fs');
var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');

var contents = fs.readFileSync("servConfig.json"); // lecture synchrone
var jsonContent = JSON.parse(contents);

var dbUrl = jsonContent.db;
var Schema = mongoose.Schema;

var db = mongoose.connect(dbUrl, function(err) {
	if(err) {
		throw err;
	} else {
        console.log('Connecte a mongoDB : ' + dbUrl);
        console.log('Creation du jeu de donnees...');
	}
});

var cpt = 0;

var TaskSchema = Schema({
	_id: String,
	taskName: String,
	done: Boolean,
	user: String
});
var TaskModel = mongoose.model('tasks', TaskSchema);
var createTask = function() {
    var taskSamp = new TaskModel({
        _id: uuidv4(),
        taskName: "task" + cpt++,
        done: false,
        user: "Bob"
    });

    taskSamp.save(function(err) {
        if(err) {throw err;}
        if(cpt == 10) {
            console.log('Fait.');
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
    login: "Bob",
    password: "Bob",
});

userSamp.save(function(err) {
    if(err) {throw err;}
    createTask();
});
