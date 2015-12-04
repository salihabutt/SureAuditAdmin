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
	
	function _guid() {
		  function s4() {
		    return Math.floor((1 + Math.random()) * 0x10000)
		      .toString(16)
		      .substring(1);
		  }
		  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		    s4() + '-' + s4() + s4() + s4();
		}
	
	var  _sortArrOfObjectsByParam = function (arrToSort /* array */, strObjParamToSortBy /* string */, sortAscending /* bool(optional, defaults to true) */) {
	    if(sortAscending == undefined) sortAscending = true;  // default to true
	    
	    if(sortAscending) {
	        arrToSort.sort(function (a, b) {
	            if(a[strObjParamToSortBy] == null) return -1;
	            return a[strObjParamToSortBy] > b[strObjParamToSortBy];
	        });
	    }
	    else {
	        arrToSort.sort(function (a, b) {
	            return a[strObjParamToSortBy] < b[strObjParamToSortBy];
	        });
	    }
	}
	
	utilityFactory.isEmpty = _isEmpty;
	utilityFactory.getUserProfile = _getUserProfile;
	utilityFactory.guid = _guid;
	utilityFactory.sortArrOfObjectsByParam = _sortArrOfObjectsByParam;
	
	return utilityFactory;

});