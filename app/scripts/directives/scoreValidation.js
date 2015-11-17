'use strict';
var REGEXP = /^(0*(?:[1-9][0-9]?|100))$/;
var REGEXP2 = /^(?!0?0.00$)\d{1,2}\.\d{0,1}$/;
angular.module('sureAuditAdminApp')
.directive('scoreCheck', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, elem, attrs, ctrl) {
	    		 $(elem).bind('input', function() { 
	    		 var val = elem.val();
	    		 if (!(REGEXP.test(val) || REGEXP2.test(val))){
	    			 elem.val('');
	    		 }
	            });
	    }
	  };
	});