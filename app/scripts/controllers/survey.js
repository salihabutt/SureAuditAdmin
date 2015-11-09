'use strict';


angular.module('sureAuditAdminApp')
	.controller('SurveyCtrl',  function ($state,homeService) {
		var self = this,
		init = function () {
		};
		self.navigate = function () {
			$state.go('addSurvey')
		};
		init();
	});