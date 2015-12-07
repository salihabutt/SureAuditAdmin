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
	
	var _guid = function() {
		  function s4() {
		    return Math.floor((1 + Math.random()) * 0x10000)
		      .toString(16)
		      .substring(1);
		  }
		  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		    s4() + '-' + s4() + s4() + s4();
		};
	
	utilityFactory.isEmpty = _isEmpty;
	utilityFactory.getUserProfile = _getUserProfile;
	utilityFactory.guid = _guid;
	
	return utilityFactory;

});