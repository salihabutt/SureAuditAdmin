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

		self.gotoSettingPage = function(){
			$state.go('appSetting');
		};

		self.goHome = function(){
			$state.go('home');
		};

		self.gotoMasterQuestion = function(){
			$state.go('masterQuestion');
		};
		
		self.navigate = function (type) {
			switch(type){
			case 'survey':
				$state.go('survey');
				break;
			}
			
		}

	});