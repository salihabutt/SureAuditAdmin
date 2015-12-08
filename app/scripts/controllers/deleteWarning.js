'use strict';
angular.module('sureAuditAdminApp')
.controller('delWarningCtrl', function ($uibModalInstance, $uibModal, msg){
	var self = this;
	self.text = msg;
	
	self.ok = function () {
		$uibModalInstance.close();
	};
	
	self.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});