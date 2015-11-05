'use strict';

angular.module('sureAuditAdminApp')
  .controller('MasterQuestion', function ($scope, $uibModal, masterQuestionService, deleteMasterQuestionService, lookupService) {
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
		 $uibModal.open({
			  animation: true,
			  templateUrl: 'addEditMasterQuestion.html',
			  controller: 'addEditMasterQuestionCtrl',
			  windowClass: 'questions-modal',
			  controllerAs: 'qmModal',
		  }).result.then(function(data) {
			  masterQuestionService.saveQuestion(data).then(function (){
				}, function (){
					//TODO ERROR block
				});
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
			 deleteMasterQuestionService.deleteData(id).then(function (response){
				console.log(response);
				if(response.Error === null){
					//to do : check the performance issue plus cross browser compatibility
					//var idx = _.chain(self.data.Data).pluck(Id).indexOf(response.Id).value();
					var index = self.data.Data.map(function(x) {return x.Id; }).indexOf(id);
					self.data.Data[index].Status = "Deleted";
				}
			}, function (){
				//TODO ERROR block
			});
		  });
	  };
  })

  .controller('addEditMasterQuestionCtrl', function ($uibModalInstance, lookupService, masterQuestionModel) {

	  	var self = this,
	  	init = function () {
	  		self.optionItems = [{orderid:'', label:'', value:''}];
	  	 	self.masterQuestionModel = masterQuestionModel;
		  	self.masterQuestionClone = angular.copy(self.masterQuestionModel);
			self.questionTypes = lookupService.questionTypesObj();
			self.selectedOption = '';
			self.disableSaveBtn = true;
	  	};
	  	
	 
	  	
	  	self.ok = function () {
		    $uibModalInstance.close(self.masterQuestionModel);
		  };

		self.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		  };
		  
		self.addOption = function () {
			var item = {orderId:'', label:'', value:''};
			self.optionItems.push(item);
		};
		
		self.updateModel = function () {
			if ((self.masterQuestionClone.Text !== self.masterQuestionModel.Text) && (self.masterQuestionClone.TypeKey !== self.masterQuestionModel.TypeKey)) {
	    		self.disableSaveBtn = false;
	    	}else {
	    		self.disableSaveBtn = true;
	    	}
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