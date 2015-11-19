'use strict';

angular.module('sureAuditAdminApp')
.controller('AddEditSurveyCtrl', function ($stateParams, $uibModal, surveyModel, utilityService, masterQuestionService, surveyService, moment) {
	var self = this,
	init = function () {
		self.auditDefinition = {};
		self.questionList = {};
		self.editSurvey = false;
		self.tab = 'ES';
		self.showFlags = false;
		self.checkSignature = false;
		self.sDate = null;
		self.sTime = '00:00:00';
		self.sAMPM = 'AM';
		self.eDate = null;
		self.eTime = '00:00:00';
		self.eAMPM = 'AM';
		self.textEntryValue = [];
		self.questionDisplay = [];
		self.totalQuesWeight = 0;
		self.totalSectionWeight = 0;
		self.name = '';

		if ($stateParams.id === '') {
			self.auditDefinition = angular.copy(surveyModel.surevyModel);
			self.auditDefinition.Key = utilityService.guid;
			var section = angular.copy(surveyModel.section);
			self.auditDefinition.Sections.push(section);
		}
		else if($stateParams.id !== '') {
			surveyService.getSurvey($stateParams.id).then(function (response) {
				self.auditDefinition = response;
				self.populateSignatures();
				self.populateQuestionDisplay();
			},function () {
				// ERROR block
			});
			
		}
		self.setDates();
		self.getAllQuestion();
		
	};

	self.populateQuestionDisplay = function () {

		for (var i = 0; i < self.auditDefinition.SummaryDisplayFlags.length ; i++) {
			self.questionDisplay[i] = self.auditDefinition.SummaryDisplayFlags[i];
		};
		console.log(self.questionDisplay);

	};

	self.populateSignatures = function () {

		for (var i = 0; i < self.auditDefinition.Signatures.length ; i++) {
			self.checkSignature = true;
			if(self.auditDefinition.Signatures[i].Source != 'Logged in User' && 
				self.auditDefinition.Signatures[i].Source != 'Subject Owner' &&
				self.auditDefinition.Signatures[i].Source != 'Subject'){
				self.textEntryValue[i] = self.auditDefinition.Signatures[i].Source;
				self.auditDefinition.Signatures[i].Source = 'Text Entry';
			}
		};
	};

	self.updateStartDate = function () {
		var getDate = moment(self.sDate).format('MM/DD/YYYY');
		var fullStartDate = getDate + 'T' + self.sTime + self.sAMPM;
		self.auditDefinition.Starts = fullStartDate;
	};


	self.updateEndDate = function () {
		var getDate = moment(self.eDate).format('MM/DD/YYYY');
		var fullEndDate = getDate + 'T' + self.eTime + self.eAMPM;
		self.auditDefinition.Ends = fullEndDate;
	};

	self.setDates = function(){

		if(self.auditDefinition.Starts != null){
			self.sDate = moment(self.auditDefinition.Starts).format('MM/DD/YYYY');
			self.sTime = moment(self.auditDefinition.Starts).format('HH-mm');
		}
		if(self.auditDefinition.Ends != null){
			self.eDate = moment(self.auditDefinition.Ends).format('MM/DD/YYYY');
			self.eTime = moment(self.auditDefinition.Ends).format('HH-mm');
		}
	};

	self.pushPullValue = function(index, item){
		if(self.questionDisplay.indexOf(item) > -1){
			self.questionDisplay.splice(self.questionDisplay.indexOf(item),1);
		}else{
			self.questionDisplay.push({index, item});
		}
		debugger;
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
			question.Status = "Ok";
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

	self.addSignature = function () {

		var signature = angular.copy(surveyModel.signature);
		self.auditDefinition.Signatures.push(signature);
	}


	
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
		//survey Settings 
		self.processSurveySettings();
		self.processQuestionDisplays();

		if($stateParams.id === ''){
		surveyService.saveSurvey(self.auditDefinition).then(function (response) {			
			self.auditDefinition.Id = response.Id;
			console.log(response)
		},function () {
			// ERROR block
		});
		}
		else{
			surveyService.updateSurvey(self.auditDefinition).then(function (response) {			
				self.auditDefinition.Id = response.Id;
				console.log(response)
			},function () {
				// ERROR block
			});
		}
	};

	self.processSurveySettings = function () {
	
		for (var i = 0 ; i < self.auditDefinition.Signatures.length ; i++ ) {
			if(self.auditDefinition.Signatures[i].Source === 'Text Entry'){
				self.auditDefinition.Signatures[i].Source = self.textEntryValue[i];
			}
		};
	};
	self.processQuestionDisplays = function () {
		for (var i = 0 ; i < self.questionDisplay.length ; i++ ) {
				self.auditDefinition.SummaryDisplayFlags[i] = self.questionDisplay[i];
		};
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
	
	self.hideQuestion = function (pIndex,cIndex,index,type) {
		if(type === 'question'){
			self.auditDefinition.Sections[pIndex].Questions[cIndex].Status = 'Inactive';
		}
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
	
