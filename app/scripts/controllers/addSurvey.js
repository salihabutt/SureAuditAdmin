'use strict'

angular.module('sureAuditAdminApp')
.controller('AddEditSurveyCtrl', function ($stateParams, surveyModel, utilityService) {
	var self = this,
	init = function () {
		self.auditDefinition = {};
		self.editSurvey = false;
		if ($stateParams.action === 'add') {
			self.auditDefinition = angular.copy(surveyModel);
			self.auditDefinition.Key = utilityService.guid;
		}
	};
	
	init();
});
