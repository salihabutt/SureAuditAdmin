'use strict';

angular.module('sureAuditAdminApp')
.service('utilityService',function (localStorageService, jwtHelper) {
	var utilityFactory = {};
	  var _isEmpty = function (obj) {
		   for (var prop in obj) {
			  if (obj.hasOwnProperty(prop)) {
		            return false;
			  }
		  	}
		    return true;
	};
	
	var _getUserProfile = function () {
		return jwtHelper.decodeToken(localStorageService.get('authData'));
	};
	
	utilityFactory.isEmpty = _isEmpty;
	utilityFactory.getUserProfile = _getUserProfile;
	
	return utilityFactory;

});