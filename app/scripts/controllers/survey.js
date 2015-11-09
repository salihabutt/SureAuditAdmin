'use strict';


angular.module('sureAuditAdminApp')
	.controller('SurveyCtrl',  function (surveyService) {
		var self = this,
		init = function () {
			surveyService.getData().then(function(response){
				self.data = response.Data;
			},function(err){

			});
		};
		self.navigate = function () {
			$state.go('addSurvey')
		};
		init();
	});