'use strict';

angular.module('sureAuditAdminApp')
.service('errorService',function () {
	this.errors = {
			loginFail: 'The username, password or customer ID you entered is incorrect. Please try again.',
			AppSetOK: 'Your settings have been saved.',
			AppSetError: 'Your settings are not saved.',
			SurveyOK: 'Survey has been saved successfully.',
			SubjectGroupOK: 'The subject group settings have been saved.'
	};
	return this.errors;

});