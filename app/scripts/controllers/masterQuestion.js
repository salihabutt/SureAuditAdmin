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

  });