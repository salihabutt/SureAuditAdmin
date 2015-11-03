'use strict';

angular.module('sureAuditAdminApp')
  .controller('MasterQuestion', function ($scope, masterQuestionService) {
	  var self = this,
  		init = function () {
			masterQuestionService.getData().then(function (response){
				self.data = {};
				self.data = response;
				console.log(self.data);
			}, function (){
				//TODO ERROR block
			});
		};

		init();

		$scope.predicate = 'Text';
		$scope.reverse = false;

		$scope.order = function(predicate) {
			$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : true;
			$scope.predicate = predicate;
	  };

  });