'use strict';
var REGEXP = /^(0*(?:[1-9][0-9]?|100))$/;
var REGEXP2 = /^\d{1,2}\.\d{0,1}$/;
var REGEXP3 = /^0$/;
var time = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
angular.module('sureAuditAdminApp')
.directive('scoreCheck', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, elem, attrs, ctrl) {
	    		var id = attrs.scoreCheck;
	    		 $(elem).bind('input', function(attrs) { 
	    			 
	    			 var val = elem.val();
	    			 if (!(REGEXP.test(val) || REGEXP2.test(val) || REGEXP3.test(val))){
	    				 $(elem).val('');
	    			 }
	    			 
	    			 var type = $(elem).attr('score-check').split('-')[0];
    				 var sectionId= null;			 
	    				 switch(type){
	    				 case 'question':
	    					 sectionId = $(elem).attr('score-check').split('-')[1];
	    					 var sum = 0.0;
	    					 var objArray = $('#section-'+ sectionId + ' .percent-weight');	 
	    					 for(var i=0;i<objArray.length;i++){
	    						 if(objArray[i].value !== ''){
	    						 sum = sum + parseFloat(objArray[i].value);
	    						 }
	    					 }
	    					 $('#total-ques-'+ sectionId).text(sum);
	    				break;	 
	    				 case 'section':
	    					 sectionId = $(elem).attr('score-check').split('-')[1];
	    					 var sum = 0.0;
	    					 var objArray = $('.section-percent-weight');	 
	    					 for(var i=0;i<objArray.length;i++){
	    						 if(objArray[i].value !== ''){
	    						 sum = sum + parseFloat(objArray[i].value);
	    						 }
	    					 }
	    					 $('#total-section-weight').text(sum);
	    				break;
	    				}
	    			 
	    		 
	            });
	    }
	  };
	});