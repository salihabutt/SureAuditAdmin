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
		self.totalQuesWeight = 0.0;
		self.totalSectionWeight = 0.0;
		self.name = '';
		self.isDataValid = true;
		self.questionDisplay = [ 
			{ label: '< 100% Response', name: 'lt100' ,selected: false },
		    { label: 'Undesired Response', name: 'undesired' ,  selected: false },
		    { label: 'Not Filled In',  name: 'notAnswered' ,   selected: false},
		    { label: 'Has Comment',name: 'hasComment' , selected: false },
		    { label: 'Has Photo',name: 'text' , selected: false },
		    { label: 'Text Entry', name: 'lt100' ,selected: false },
		    { label: 'Numeric', name: 'numeric' ,selected: false }
								];

		if ($stateParams.id === '') {
			self.auditDefinition = angular.copy(surveyModel.surevyModel);
			self.auditDefinition.Key = utilityService.guid;
			var section = angular.copy(surveyModel.section);
			self.auditDefinition.Sections.push(section);
		}
		else if($stateParams.id !== '') {
			surveyService.getSurvey($stateParams.id).then(function (response) {
				debugger;
				self.auditDefinition = response;
				self.populateSignatures();
				self.populateQuestionDisplays();

			},function () {
				// ERROR block
			});
			
		}
		self.setDates();
		self.getAllQuestion();
		
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
				},
				isScored: function () {
					return self.auditDefinition.IsScored;
				}
			}
		}).result.then(function(question){
			question.Status = "Ok";
			if(cIndex !== null && action !== null){
				switch(action) {
				case 'above':
					self.auditDefinition.Sections[pIndex].Questions.splice(cIndex,0,question);
					self.auditDefinition.QuestionCount++;
					break;
				case 'below':
					self.auditDefinition.Sections[pIndex].Questions.splice(cIndex-1,0,question);
					self.auditDefinition.QuestionCount++;
					break;
				case 'branch':
					if(self.auditDefinition.Sections[pIndex].Questions[cIndex].Branches.length <= 0){
						var branch = angular.copy(surveyModel.branch);
						self.auditDefinition.Sections[pIndex].Questions[cIndex].Branches.push(branch);
					}
					self.auditDefinition.Sections[pIndex].Questions[cIndex].Branches[0].Questions.push(question);
					self.auditDefinition.QuestionCount++;
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
				},
				isScored: function () {
					return self.auditDefinition.IsScored;
				}
			}
		});
	};
	
	self.addSection = function (pIndex) {
		var section = angular.copy(surveyModel.section);
		if(pIndex === null){
			self.auditDefinition.Sections.push(section);
		}else{
			self.auditDefinition.Sections.splice(pIndex+1,0,section);
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
		self.isDataValid = true;
		self.validationCheck();
		self.checkTotalSectionWeight();
		if(self.isDataValid){
			//survey Settings 
			self.processSurveySettings();
			self.processQuestionDisplays();

			if($stateParams.id === ''){ //ADD SURVEY
				surveyService.saveSurvey(self.auditDefinition).then(function (response) {			
					self.auditDefinition.Id = response.Id;
					console.log(response)
				},function () {
					// ERROR block
				});
			}
			else{ //EDIT SURVEY
				surveyService.updateSurvey(self.auditDefinition).then(function (response) {			
					self.auditDefinition.Id = response.Id;
					console.log(response)
				},function () {
				// ERROR block
				});
			}
		}
	};
	
	self.validationCheck = function () {
		var fields = '';
		if(utilityService.isEmpty(self.auditDefinition.Name)){
			fields = 'survey name,';
		}
		
		if(fields !== ''){
			self.isDataValid = false;
			var message = "Please enter values for "+ fields.substring(0,fields.length-1);
			self.openValidationPopup(message);
		}
	};
	
	self.openValidationPopup = function (message) {
		$uibModal.open({
			animation: true,
			templateUrl: 'views/validationPopup.html',
			controller: 'validationsCtrl',
			windowClass: 'changes-warning-modal',
			controllerAs: 'vModal',
			resolve: {
				msg: function () {
					return  message;
				}
			}
		});
	};
	self.checkTotalSectionWeight = function () {
		if(parseFloat(self.totalSectionWeight) > 100 && self.isDataValid){
			self.isDataValid = false;
			var message = "All Sections weight must add up to 100%";
			self.openValidationPopup(message);
		}
	}

	self.processSurveySettings = function () {
	
		for (var i = 0 ; i < self.auditDefinition.Signatures.length ; i++ ) {
			if(self.auditDefinition.Signatures[i].Source === 'Text Entry'){
				self.auditDefinition.Signatures[i].Source = self.textEntryValue[i];
			}
		};
	};

	self.processQuestionDisplays = function(){
		debugger;
		for (var i = 0; i < self.questionDisplay.length; i++) {
			if(self.questionDisplay[i].selected === true){
				self.auditDefinition.SummaryDisplayFlags.push(self.questionDisplay[i].name) 
			}
		};
	};

	self.populateQuestionDisplays = function(){
		debugger;
		for (var i = 0; i < self.auditDefinition.SummaryDisplayFlags.length; i++) {
			for (var j = 0 ; j < self.questionDisplay.length; j++) {
				if(self.auditDefinition.SummaryDisplayFlags[i] === self.questionDisplay[j].name){
					self.questionDisplay[j].selected = true;
				}
			};
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
				self.auditDefinition.QuestionCount = self.auditDefinition.QuestionCount - self.auditDefinition.Sections[pIndex].Questions.length;
				self.auditDefinition.Sections.splice(pIndex,1);
				break;
			case 'question':
				self.auditDefinition.Sections[pIndex].Questions.splice(cIndex,1);
				self.auditDefinition.QuestionCount--;
				break;
			}
		})
	};
	
	self.hideQuestion = function (pIndex,cIndex,index,type) {
		if(type === 'question'){
			self.auditDefinition.Sections[pIndex].Questions[cIndex].Status = 'Inactive';
		}
	};
	
	self.resetPoints = function (pIndex) {
		self.totalQuesWeight = 0.0;
		for(var i=0;i<self.auditDefinition.Sections[pIndex].Questions.length;i++){
			self.auditDefinition.Sections[pIndex].Questions[i].PointsAllowed = 0.0;
		}
	};
	
	self.distributePoints = function (pIndex) {
		self.auditDefinition.Sections[pIndex].weight = 100;
		var size = 0;
		self.totalQuesWeight = 0.0;
		for(var i=0;i<self.auditDefinition.Sections[pIndex].Questions.length;i++){
			if(self.auditDefinition.Sections[pIndex].Questions[i].Status == 'Ok'){
				size++;
			}	
		}
		var points = parseFloat("100")/size;
		for(var j=0;j<self.auditDefinition.Sections[pIndex].Questions.length;j++){
			self.auditDefinition.Sections[pIndex].Questions[j].PointsAllowed = points;
			self.totalQuesWeight = points + self.totalQuesWeight;	
		}
	};
	
	init();
})
.controller('AddSurveyQuestionCtrl', function ($uibModalInstance, $uibModal, mq, action, question, isScored){
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
				},
				isScored: function () {
					return isScored;
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
	
