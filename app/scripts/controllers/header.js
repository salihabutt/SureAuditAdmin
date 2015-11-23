'use strict';


angular.module('sureAuditAdminApp')
	.controller('headerCtrl',  function ($state, authService, $uibModal ) {
		var self = this;
		self.expandQuesMenu = false;
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
			switch (view) {
			case 'HOME': 
				$state.go('home');
				break;
			case 'MQUESTION':
				$state.go('masterQuestion');
				break;
			case 'SURVEY':
				$state.go('survey');
				break;
			case 'SURVEYGROUPS':
				$state.go('surveyGroups');
				break;
			}
		};
	
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