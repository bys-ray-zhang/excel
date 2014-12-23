SAPP.service('httpService', ['$http', '$q', function($http, $q){
	var service = {};
	service.get = function(scope, url){
	var deferred = $q.defer();
	$http.get(url).success(function(response){
			scope.wait = false;	
			deferred.resolve(response);
		}).error(function(response){
			scope.wait = false;
			deferred.resolve('error!');
		});
		return deferred.promise;
	};
	
	/*
	 * 
	 * success: it would return the same promise, so you can't the data you return, if you 
	 * use the 'then' promise, it will return the new promise, then you can retrieve the data you return.
	 * error: 
	 * 
	 * return: promise,
	 * 
	 * usage: httpService.post(scope, url).then(function(response){
			//success handler
			return;
		}, function(response){
			//error handler
			return; 
		});
	 * 
	 * */
	service.post = function(scope, url, postData){
		scope.wait = true;
		var deferred = $q.defer();
		$http.post(url, postData).success(function(response){
			scope.wait = false;			
			deferred.resolve(response);
		}).error(function(response){
			scope.wait = false;
			deferred.resolve('error!');
		});
		return deferred.promise;
	};
	return service;
}]);