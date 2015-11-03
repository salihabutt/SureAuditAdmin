'use strict';

angular.module('sureAuditAdminApp')
	.factory('appSettingService', function ($http, $q, configurations) {
		
		var appSettingService = {};
		
		var _getSettings = function(){
			var deferred = $q.defer();
			var request = {
				method: 'GET',
				url: configurations.sureAudit + configurations.serviceBase + 'Settings'
			};

	    	$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			

		  	return deferred.promise;
		};
		
		var _updateSettings = function (response) {
			var deferred = $q.defer();
			var request = {
					method: 'PUT',
					url: configurations.sureAudit + configurations.serviceBase + 'Settings/' + response.Id,
					data: JSON.stringify(response)
			};
			$http(request).success( function(response){
	    		deferred.resolve(response);
		  	}).error(function(err){
		  		deferred.reject(err);
		  	});
			return deferred.promise;
		};

		appSettingService.getSettings = _getSettings;
		appSettingService.updateSettings = _updateSettings;
		return appSettingService;
	});