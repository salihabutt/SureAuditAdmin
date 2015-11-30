'use strict';


angular.module('sureAuditAdminApp')
	.controller('HomeCtrl',  function ($state,homeService) {
		var self = this,
		init = function () {
			homeService.getCounts().then(function (response){
				self.data = {};
				self.data = response;
			}, function (){
				//TODO Error BLOCK
			});
		};
		
		init();


		self.goHome = function(){
			$state.go('home');
		};

		self.navigate = function (type) {
			$state.go(type);
		};


	});