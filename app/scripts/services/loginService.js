"use strict";

angular.module('sureAuditAdminApp')
	.service('loginService', function ($http) {
		this.uname = '';
	   	this.pass = '';

		this.submitForm = function(){
	    	var obj = {};
	    	obj.username = this.uname;
	    	obj.password = this.pass;
	    	obj.appkey = 'sureaudit';
	    	obj.custkey = 'propelics';
	    	obj.devicekey = 'tkxel';
	    	obj.grant_type = 'password';
	    	var request = {
				method: 'POST',
				url: 'https://identity-dev.propelics.com/api/v1/token',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				},
				transformRequest: function (obj) {
					debugger;
					var str = [];
					for (var p in obj){
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
						return str.join("&");
					
				},
				data:{username:this.uname, password:this.pass, appkey:'sureaudit', custkey:'propelics',
					devicekey:'tkxel', grant_type:'password'}
		    	
			};

	    	$http(request).then(function success(responce){
		  		console.log(responce);
		  	},function error(responce){
		  		console.log(responce);
		  	});
	  	}		
	
	})