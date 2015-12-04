'use strict';


angular.module('sureAuditAdminApp')
	.controller('headerCtrl',  function ($state, $stateParams, authService, $uibModal ) {
		var self = this,

		init = function(){
			self.expandQuesMenu = false;
			//self.getState = $state;
			self.getState = $stateParams.parent;
		
		};

		self.getProfile = function () {
			$state.go('profile');
		};
		


		self.logout = function () {
			$uibModal.open({
			  animation: true,
			  templateUrl: 'logoutConfirmation.html',
			  controller: 'logoutConfirmation',
			  windowClass: 'logout-modal',
			  controllerAs: 'lcModal',
		  	}).result.then(function(){ 
				authService.logOut();
			});
		};



		self.navigate = function (view) {
			$state.go(view);
		};

		init();
	
})
.controller('logoutConfirmation', function ($uibModalInstance) {

	  	var self = this;
	  	self.ok = function () {
		    $uibModalInstance.close();
		};

		self.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		};

  });