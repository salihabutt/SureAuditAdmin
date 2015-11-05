'use strict';

angular.module('sureAuditAdminApp')
  .controller('MasterQuestion', function ($http, $uibModal, masterQuestionService, lookupService, configurations) {
	  var self = this,
  		init = function () {
		  //initialize lookup data
		  	lookupService.questionTypes();
			masterQuestionService.getData().then(function (response){
				self.data = {};
				self.data = response;
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

	  self.deleteMasterQuestion = function (id) {
	  	
		  $uibModal.open({
			  animation: true,
			  templateUrl: 'deleteMasterQuestion.html',
			  controller: 'deleteMasterQuestionCtrl',
			  windowClass: 'questions-modal-delete',
			  controllerAs: 'qmModal',
		  }).result.then(function(){
			 
		  	var request = {
				method: 'DELETE',
				url: configurations.sureAudit + configurations.serviceBase + 'MasterQuestions/'+ id 
			};
			$http(request).success( function (response) {
	    		if(response.Error == null){
					//to do : check the performance issue plus cross browser compatibility
					//var idx = _.chain(self.data.Data).pluck(Id).indexOf(response.Id).value();
					var index = self.data.Data.map(function(x) {return x.Id; }).indexOf(id);
					self.data.Data[index].Status = "Deleted";
				}
		  	}).error(function(err){
		  		console.log(err)
		  	});
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

	
  })
  .controller('deleteMasterQuestionCtrl', function ($uibModalInstance) {

	  	var self = this;
	  	self.ok = function () {
		    $uibModalInstance.close();
		};

		self.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		};

  });