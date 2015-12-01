'use strict';
var REGEXP = /^([0])?[1-9]\:?[0-5][0-9]$/;
var REGEXP2 =/^([1])[0-2]\:?[0-5][0-9]$/; 
angular.module('sureAuditAdminApp')
.directive('timeValidator', function() {
	  return {
	  	restrict: 'A',
	    link: function(scope, elem) {
			$(elem).bind('input', function() { 
				var val = $(elem).val();
				if(val.length>5 && val.search(':') > 0){
					val = val.substring(0,val.length-1);
					$(elem).val(val);
					angular.element($(elem)).triggerHandler('input');
				}
				if(val.length === 4 && val.search(':') < 0){
					val = val.substring(0,2) + ':' + val.substring(2,4);
					$(elem).val(val);
					angular.element($(elem)).triggerHandler('input');
				}
				if((!REGEXP.test(val) && !REGEXP2.test(val)) && val!== ''){
					$(elem).css('border','1px solid red');
					$(elem).css('background-color','#EAC1C1');
					
				}
				else{
					$(elem).css('border','1px solid #ccc');
					$(elem).css('background-color','#FFFFFF');
				}
    		/*	if(this.value.length > 5 && !timeRegex.test($(this).val()))
    			{
    				$(this).val("");
    			}*/
			});
		} 
	  };
	});