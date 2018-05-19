routingApp.factory('userService', ['$http', function($http) {
    var serv = {};
    serv.login = function(dataLog, cb) {
        $http.post('/login', dataLog).then(function(resp) {
            cb(resp.data.success);
        });
    };
	serv.register = function(dataLog, cb) {
        $http.post('/register', dataLog).then(function(resp) {
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
