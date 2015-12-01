'use strict';

angular.module('sureAuditApp')
.controller('SubjectGroupSettingsCtrl', function ($state){
	var self = this,
	init = function () {
		self.id = $state.id;
	};
	
	init();
	
});