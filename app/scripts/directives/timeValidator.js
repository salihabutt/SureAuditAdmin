'use strict';
 
angular.module('sureAuditAdminApp')
.directive('timeValidator', function() {
	  return {
	  	restrict: 'A',
	    link: function(scope, elem) {
			$(elem).bind('blur', function(scope) { 
				var timeRegex = /([01]\d|2[0-3]):([0-5]\d)/;
    			if(this.value.length > 5 && !timeRegex.test($(this).val()))
    			{
    				$(this).val("");
    			}
			});
		} 
	  };
	});