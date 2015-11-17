'use strict';

angular.module('sureAuditAdminApp')
.controller('AddEditSurveyCtrl', function ($stateParams, $uibModal, surveyModel, utilityService, masterQuestionService, surveyService) {
	var self = this,
	init = function () {
		self.auditDefinition = {};
		self.questionList = {};
		self.editSurvey = false;
		self.tab = 'ES';
		self.name = '';
		if ($stateParams.id === '') {
			self.auditDefinition = angular.copy(surveyModel.surevyModel);
			self.auditDefinition.Key = utilityService.guid;
		}
		else if($stateParams.id !== '') {
			surveyService.getSurvey($stateParams.id).then(function (response) {
				self.auditDefinition = response;
			},function () {
				// ERROR block
			});
			
		}
		self.getAllQuestion();
	};

	self.selectedTab = function (tab) {
		switch(tab)
		{
			case 'ES':
				self.tab = 'ES';
				break;
			case 'SS':
				self.tab = 'SS';
				break;
			case 'SmS':
				self.tab = 'SmS';
				break;
			default:
				self.tab = 'ES';
				break;
		}
	};
	
	self.getAllQuestion = function () {
		masterQuestionService.getData().then(function (response){
			self.questionList = response;
		}, function (){
			//TODO ERROR block
		});
	};
	self.addQuestion = function (pIndex,cIndex,action) {
		$uibModal.open({
			animation: true,
			templateUrl: 'addSurveyQuestion.html',
			controller: 'AddSurveyQuestionCtrl',
			windowClass: 'survey-questions-modal',
			controllerAs: 'mqModal',
			resolve: {
				mq: function () {
					return self.questionList;
				},
				action: function () {
					return 'add';
				},
				question: function () {
					return null;
				}
			}
		}).result.then(function(question){
			if(cIndex !== null && action !== null){
				switch(action) {
				case 'above':
					self.auditDefinition.Sections[pIndex].Questions.splice(cIndex,0,question);
					break;
				case 'below':
					self.auditDefinition.Sections[pIndex].Questions.splice(cIndex-1,0,question);
					break;
				case 'branch':
					if(self.auditDefinition.Sections[pIndex].Questions[cIndex].Branches.length <= 0){
						var branch = angular.copy(surveyModel.branch);
						self.auditDefinition.Sections[pIndex].Questions[cIndex].Branches.push(branch);
					}
					self.auditDefinition.Sections[pIndex].Questions[cIndex].Branches[0].Questions.push(question);
					break;
				}
			}
			else{
				self.auditDefinition.Sections[pIndex].Questions.push(question);
				self.auditDefinition.QuestionCount++;
			}
		});
	};
	
	self.editQuestion = function (question) {
		$uibModal.open({
			animation: true,
			templateUrl: 'addSurveyQuestion.html',
			controller: 'AddSurveyQuestionCtrl',
			windowClass: 'survey-questions-modal',
			controllerAs: 'mqModal',
			resolve: {
				mq: function () {
					return self.questionList;
				},
				question: function () {
					return question;
				},
				action: function () {
					return 'edit';
				}
			}
		});
	};
	
	self.addSection = function (pIndex) {
		var section = angular.copy(surveyModel.section);
		if(pIndex === 0 || pIndex === self.auditDefinition.Sections.length-1){
			self.auditDefinition.Sections.push(section);
		}else{
			self.auditDefinition.Sections.splice(pIndex,0,section);
		}
	};
	
	self.orderSection = function (index, action, type) {
		switch(type){
		case 'section':
			if(self.auditDefinition.Sections.length > 1 && action === 'down'){
				self.sortDown(self.auditDefinition.Sections,index);
			}
			else if(self.auditDefinition.Sections.length > 1 && action === 'up'){
				self.sortUp(self.auditDefinition.Sections,index);
			}
			break;
			
		}
	};
	
	self.orderQuestion = function (pIndex,index, action) {

			if(self.auditDefinition.Sections[pIndex].Questions.length > 1 && action === 'down'){
				self.sortDown(self.auditDefinition.Sections[pIndex].Questions,index);
			}
			else if(self.auditDefinition.Sections[pIndex].Questions.length > 1 && action === 'up'){
				self.sortUp(self.auditDefinition.Sections[pIndex].Questions,index);
			}
			
	};
	
	self.orderBranchQues = function (pIndex,cIndex,index,action){
		if(self.auditDefinition.Sections[pIndex].Questions[cIndex].Branches[0].Questions.length > 1 && action === 'down'){
			self.sortDown(self.auditDefinition.Sections[pIndex].Questions[cIndex].Branches[0].Questions,index);
		}
		else if(self.auditDefinition.Sections[pIndex].Questions[cIndex].Branches[0].Questions.length > 1 && action === 'up'){
			self.sortUp(self.auditDefinition.Sections[pIndex].Questions[cIndex].Branches[0].Questions,index);
		}
	};
	
	self.sortUp = function (array,index) {
		var temp = array[index];
		array[index] = array[index-1];
		array[index-1] = temp;
	};
	
	self.sortDown = function (array,index) {
		var temp = array[index];
		array[index] = array[index+1];
		array[index+1] = temp;
	};
	
	self.saveAuditDef = function () {
		debugger;
		if($stateParams.id === ''){
		surveyService.saveSurvey(self.auditDefinition).then(function (response) {			
			self.auditDefinition.Id = response.Id;
		},function () {
			// ERROR block
		});
		}
		else{
			surveyService.updateSurvey(self.auditDefinition).then(function (response) {			
				self.auditDefinition.Id = response.Id;
			},function () {
				// ERROR block
			});
		}
	};
	
	self.deleteAny = function (pIndex,cIndex,index,type) {
		$uibModal.open({
			animation: true,
			templateUrl: 'delWarning.html',
			controller: 'delWarningCtrl',
			windowClass: 'changes-warning-modal',
			controllerAs: 'dwModal',
			resolve: {
				msg: function () {
					var message = '';
					switch(type){
					case 'section':
						message = 'Are you sure you want to delete this section and all question in it?';
						break;
					case 'question':
						message = 'Are you sure you want to delete the question?';
						break;
					}
					return message;
				}
			}
		}).result.then(function(){
			switch(type){
			case 'section':
				self.auditDefinition.Sections.splice(pIndex,1);
				break;
			case 'question':
				self.auditDefinition.Sections[pIndex].Questions.splice(cIndex,1);
				break;
			}
		})
	};
	
	init();
})
.controller('AddSurveyQuestionCtrl', function ($uibModalInstance, $uibModal, mq, action, question){
	var self = this,
	init = function () {
		self.questions = mq;
		self.selected = null;
		self.selctedQuestion = {};
		self.disabled = false;
		self.subject = 'Add Question to Survey';
		if(action === 'edit'){
			self.selctedQuestion = question;
			self.selected = question.MasterId;
			self.disabled = true;
			self.subject = 'Edit Question';
		}
	};
	
	self.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
	self.setSelected = function (item) {
		self.selctedQuestion = item;
	};
	
	self.next = function () {
		$uibModal.open({
			animation: true,
			templateUrl: 'views/addSurveyQuestionDetail.html',
			controller: 'AddSurveyQuestionDetailCtrl',
			windowClass: 'survey-questiondetail-modal',
			controllerAs: 'sqdModal',
			resolve:{
				ques: function () {
					return self.selctedQuestion;
				},
				action: function () {
					return action;
				}
			}
		}).result.then(function (question){
			if(question !== null){
				$uibModalInstance.close(question);
			}
		}, function (){
			$uibModalInstance.dismiss('cancel');
		});
	};
	init();
	
})
.controller('delWarningCtrl', function ($uibModalInstance, $uibModal, msg){
	var self = this;
	self.text = msg;
	
	self.ok = function () {
		$uibModalInstance.close();
	};
	
	self.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
	
});
	
