'use strict';
// dummb expression does not work with variable names
var REGEXP = /^(([0-9]{1,2})?(\.[0-9])?|100)$/;
var REGEXP2 = /^\d{1,2}\.\d{0,1}$/;
var REGEXP3 = /^0$/;
angular.module('sureAuditAdminApp')
.directive('scoreCheck', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, elem, attrs, ctrl) {
	    		 $(elem).bind('input', function(scope,attrs) { 
	    			 var val = elem.val();
	    			 if (!(/^(([0-9]{1,2})?(\.[0-9])?|100)$/.test(val)) && val!== ''){
	    				 var temp = '';
	    				 if(val.search('.') > 0){
	    					 if(val.charAt(0) === '.'){
	    						 temp = val.replace('.','');
	    						 if(temp.length>1){
		    						 $(elem).val(val.substring(0,val.length-1));
		    					 }
	    					 }else if(val.charAt(1) === '.'){
	    					 temp = val.replace('.','');
	    					 if(temp.length>2){
	    						 $(elem).val(val.substring(0,val.length-1));
	    					 }
	    					 }
	    				 }else{
	    					 if(val.length>3 || val>100){
	    						 $(elem).val(val.substring(0,val.length-1));
	    					 }
	    				 }
	    			 }
	    			 
	    				 var type = $(elem).attr('score-check').split('-')[0];
	    				 var sectionId= null;			 
	    				 switch(type){
	    				 case 'question':
	    					 if($(elem).attr('status') === 'OK'){
	    					 sectionId = $(elem).attr('score-check').split('-')[1];
	    					 var sum = 0.0;
	    					 var objArray = $('#section-'+ sectionId + ' .percent-weight');	 
	    					 for(var i=0;i<objArray.length;i++){
	    						 if(objArray[i].value !== '' && objArray[i].value !== '.'){
	    						 sum = sum + parseFloat(objArray[i].value);
	    						 }
	    					 }
	    					 $('#total-ques-'+ sectionId).text(sum);
	    					 $('#total-ques-weight-input-'+ sectionId).val(sum);
	    					 angular.element($('#total-ques-weight-input-'+ sectionId)).triggerHandler('input');
	    					 }
	    				break;	 
	    				 case 'section':
	    					 sectionId = $(elem).attr('score-check').split('-')[1];
	    					 var sum = 0.0;
	    					 var objArray = $('.section-percent-weight');	 
	    					 for(var j=0;j<objArray.length;j++){
	    						 if(objArray[j].value !== '' && objArray[j].value !== '.'){
	    						 sum = sum + parseFloat(objArray[j].value);
	    						 }
	    					 }
	    					 $('#total-section-weight').text(sum);
	    					 $('#total-section-weight-input').val(sum);
	    					 angular.element($('#total-section-weight-input')).triggerHandler('input');
	    				break;
	    				}
	    			 
	            }); 
	    }
	  };
	});