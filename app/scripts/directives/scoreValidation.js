'use strict';
var REGEXP = /^(0*(?:[1-9][0-9]?|100))$/;
var REGEXP2 = /^(?!0?0.00$)\d{1,2}\.\d$/;
angular.module('sureAuditAdminApp')
.directive('scoreCheck', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, elem, attrs, ctrl) {
	    	 elem.on("keyup", function() {
	    		 var val = elem.val();
	    		 debugger;
	    		 if (!(REGEXP.test(val) || REGEXP2.test(val))){
	    			 elem.val('');
	    		 }
	            });
	    }
	  };
	});