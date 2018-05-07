routingApp.factory('todoService', ['$http', function($http) {
	var serv = {};

	serv.getUser = function(cb) {
		$http.post('/getUser').then(function(resp) {
			cb(resp.data.user);
		});
	};
	serv.logout = function(cb) {
		$http.post('/logout').then(function(resp) {
			cb(resp.data.success);
		});
	};
	serv.addTask = function(name, cb) {
			var req = {
				name : name
			};
			$http.post('/addTask', req).then(function(resp) {
				cb(resp.data.success);
			});
	};
	serv.getTaskSet = function(cb) {
		$http.post('/getTaskSet').then(function(resp) {
			cb(resp.data.taskSet);
		});
	};
	serv.deleteTask = function(task, cb) {
		var req = {
			id: task
		};
		$http.post('/deleteTask', req).then(function(resp) {
			cb(resp.data.success);
		});
	};

	serv.saveTaskSet = function(task, cb) {
	    var req = {
	        id: task
	    };
	    $http.post('/saveTaskSet', req).then(function(resp) {
		    cb(resp.data.success);
		});
	};

	return serv;
}]);
