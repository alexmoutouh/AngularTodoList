routingApp.factory('todoService', ['$http', function($http) {
	var serv = {};

	serv.logout = function(user, cb) {
		$http.post('/logout', user).then(function(resp) {
			cb(resp.data.url);
		});
	};
	serv.addTask = function(name, user, cb) {
		var req = {
			name : name,
			user : user
		};
		$http.post('/addTask', req).then(function(resp) {
			cb(resp.data.success);
		});
	};
	serv.getTaskSet = function(user, cb) {
		var req = {
			user : user
		};
		$http.post('/getTaskSet', req).then(function(resp) {
			cb(resp.data.taskSet);
		});
	};
	serv.deleteTask = function(task, user, cb) {
		var req = {
			id: task,
			user : user
		};
		$http.post('/deleteTask', req).then(function(resp) {
			cb(resp.data.success);
		});
	};

	serv.saveTaskSet = function(task, user, cb) {
	    var req = {
			id: task,
			user : user
	    };
	    $http.post('/saveTaskSet', req).then(function(resp) {
		    cb(resp.data.success);
		});
	};

	return serv;
}]);
