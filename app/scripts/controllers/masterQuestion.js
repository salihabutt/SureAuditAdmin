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

		self.predicate = 'Text';
		self.reverse = false;

		self.order = function(predicate) {
			self.reverse = (self.predicate === predicate) ? !self.reverse : true;
			self.predicate = predicate;
	  };

  });