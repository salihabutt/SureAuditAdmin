'use strict';

angular.module('sureAuditAdminApp')
  .controller('MainCtrl', function ($scope) {
  
	  $scope.isEmpty = function (obj) {
		   for (var prop in obj) {
 			  if (obj.hasOwnProperty(prop)) {
 		            return false;
 			  }
 		  	}
 		    return true;
 	};
  });