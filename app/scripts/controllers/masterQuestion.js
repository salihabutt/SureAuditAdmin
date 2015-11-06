'use strict';

angular.module('sureAuditAdminApp')
  .controller('MasterQuestion', function ($http, $uibModal, masterQuestionService, lookupService) {
	  var self = this,
  		init = function () {
		  //initialize lookup data
			self.data = {};
		  	lookupService.questionTypes();
		  	self.getQuestions();
		};

		
		self.getQuestions = function () {
			masterQuestionService.getData().then(function (response){
				self.data = response;
			}, function (){
				//TODO ERROR block
			});
		};
		
		self.predicate = 'Text';
		self.reverse = false;

		self.order = function(predicate) {
			self.reverse = (self.predicate === predicate) ? !self.reverse : true;
			self.predicate = predicate;
		};
	  
	  self.addEditMasterQuestion = function (question, action) {
		  var item = {};
		  item.action = action;
		  item.question = question;
		 $uibModal.open({
			  animation: true,
			  templateUrl: 'addEditMasterQuestion.html',
			  controller: 'addEditMasterQuestionCtrl',
			  windowClass: 'questions-modal',
			  controllerAs: 'qmModal',
			  resolve: {
				  item: function () {
					  return item;
				  }
			  } 
		  }).result.then(function(mq) {
			  mq.Key = action === 'ADD'? 'key' + (self.data.Data.length +1) : mq.Key;
			  masterQuestionService.saveUpdateQuestion(mq,action).then(function (response){
				  if(action === 'ADD'){
					  mq.Id = response.Id;
					  self.data.Data.push(mq);
				  }else{
					  	var index = self.data.Data.map(function(x) {return x.Id; }).indexOf(mq.Id);
						self.data.Data[index] = mq;
				  }
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
			masterQuestionService.deleteQuestion(id).then(function (response){
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
	  
	  init();
  })
  .controller('addEditMasterQuestionCtrl', function ($uibModalInstance, lookupService, masterQuestionModel, item) {

	  	var self = this,
	  	init = function () {
	  		self.optionItems = [{id:'', label:'', value:''}];
	  		self.optionsClone = [];
	  	 	self.masterQuestionModel = angular.copy(masterQuestionModel);
		  	self.masterQuestionClone = angular.copy(self.masterQuestionModel);
			self.questionTypes = lookupService.questionTypesObj();
			self.disableSaveBtn = true;
			self.subject = "Add New Master Question";
			if(item.action === 'EDIT') {
				self.initEditModal();
			}
	  	};
	  	
	  	self.initEditModal = function () {
	  		self.subject = "Edit Master Question";
			self.masterQuestionModel = angular.copy(item.question);
		  	self.masterQuestionClone = angular.copy(item.question);
		  	if(item.question.AllowableValues.length>0){
		  		self.optionItems=[];
		  	}
		  	for(var i=0; i< self.masterQuestionModel.AllowableValues.length; i++) {
		  		var temp = {};
		  		temp.id = parseInt(self.masterQuestionModel.AllowableValues[i].Key);
		  		temp.label = self.masterQuestionModel.AllowableValues[i].Label;
		  		temp.value = self.masterQuestionModel.AllowableValues[i].Value;
		  		self.optionItems.push(temp);
		  	}
		  	self.optionsClone = angular.copy(self.optionItems);
	  	};
	  	
	  	self.ok = function () {
	  		self.optionItems.sort(function(a, b) { return a.id - b.id; });
	  		self.masterQuestionModel.AllowableValues = [];
	  		for(var i=0; i< self.optionItems.length; i++) {
	  			var obj = {};
	  			obj.Key = self.optionItems[i].id;
	  			obj.Label = self.optionItems[i].label;
	  			obj.Value = self.optionItems[i].value;
	  			self.masterQuestionModel.AllowableValues.push(obj);
	  		}
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
			self.disableSaveBtn = true;
			if ((self.masterQuestionClone.Text !== self.masterQuestionModel.Text) && (self.masterQuestionModel.TypeKey !== '')) {
				self.disableSaveBtn = false;
				}
	    	if(item.action === 'EDIT') {
				if(!angular.equals(self.optionsClone,self.optionItems)) {
					self.disableSaveBtn = false;
				}
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