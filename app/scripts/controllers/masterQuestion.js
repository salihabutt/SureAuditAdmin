'use strict';

angular.module('sureAuditAdminApp')
  .controller('MasterQuestion', function ($scope, $uibModal, masterQuestionService, lookupService) {
	  var self = this,
  		init = function () {
		  //initialize lookup data
		  	lookupService.questionTypes();
			masterQuestionService.getData().then(function (response){
				self.data = {};
				self.data = response;
				console.log(JSON.stringify(self.data));
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
	  
	  self.addEditMasterQuestion = function () {
		  var modalInsatance = $uibModal.open({
			  animation: true,
			  templateUrl: 'addEditMasterQuestion.html',
			  controller: 'addEditMasterQuestionCtrl',
			  windowClass: 'questions-modal',
			  controllerAs: 'qmModal',
		  });
	  };

  })
  .controller('addEditMasterQuestionCtrl', function ($uibModalInstance, lookupService, masterQuestionModel) {

	  	var self = this,
	  	init = function () {
	  		self.optionItems = [{orderid:'', label:'', value:''}];
	  	};
	  	
	  	self.masterQuestionModel = masterQuestionModel;
		self.questionTypes = lookupService.questionTypesObj();
		self.selectedOption = '';
	  	
	  	self.ok = function () {
		    $uibModalInstance.close();
		  };

		self.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		  };
		  
		self.addOption = function () {
			var item = {orderId:'', label:'', value:''};
			self.optionItems.push(item);
		};
		  init();
  });