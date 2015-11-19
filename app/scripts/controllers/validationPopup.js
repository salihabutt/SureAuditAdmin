'use strict';

angular.module('sureAuditAdminApp')
.controller('validationsCtrl', function ($uibModalInstance,msg) {

	  	var self = this;
	  	self.message = msg;
	  	self.ok = function () {
	  		$uibModalInstance.dismiss('cancel');
		};

  });