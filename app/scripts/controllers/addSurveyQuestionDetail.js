'use strict';

angular.module('sureAuditAdminApp')
.controller('AddSurveyQuestionDetailCtrl', function ($uibModal, $uibModalInstance, ques, surveyModel, action, utilityService) {
	var self = this,
	init = function () {
		self.subject = 'Add Question to Survey';
		self.defaultRespList = ['Yes','No'];
		self.defaultResp = '';
		self.undesiredRespList = ['Yes','No'];
		self.undesiredResp = '';
		self.question = angular.copy(surveyModel.question);
		self.imageCount = 1;
		self.responseRatioOptions = [
		                             {
		                            	 label: 'Yes',
		                            	 active: false,
		                            	 value: 0	 
		                             },
		                             {
		                            	 label: 'No',
		                            	 active: false,
		                            	 value: 0
		                             }];
		
		self.commentRequired = false;
		self.undesiredReq  = false;
		self.commentsSwitch = false;
		self.imageSwitch = false;
		self.imageRequired = false;
		self.undesiredImgReq  = false;  
		
		if(action === 'edit'){
			self.editMode();
		}
		else if(action === 'add'){
			self.question.MasterId = ques.Id;
			self.question.Text = ques.Text;
			self.question.TypeKey = ques.TypeKey;
			self.question.Label = ques.Label;
			self.question.Name = ques.Name;
			self.question.Id = null;
		}
	};
	
	self.editMode = function () {
		self.subject = 'Edit Question';
		self.question = ques;
		self.imageCount =  ques.MaxImagesAllowed;
		for(var i =0;i<ques.ResponseRatios.length;i++){
			var obj = {};
			if(!utilityService.isEmpty(ques.ResponseRatios[i].ValueMatch)){
				if(self.responseRatioOptions[0].label === ques.ResponseRatios[i].ValueMatch){
					self.responseRatioOptions[0].active = true;
					self.responseRatioOptions[0].value = ques.ResponseRatios[i].Ratio;
				}
				else if (self.responseRatioOptions[1].label === ques.ResponseRatios[i].ValueMatch){
					self.responseRatioOptions[1].active = true;
					self.responseRatioOptions[1].value = ques.ResponseRatios[i].Ratio;
				}
			}
		}
		switch(ques.IsCommentRequired){
		case 1:
			self.commentRequired = true;
			self.undesiredReq  = true;
			self.commentsSwitch = true;
			break;
		case 3:
			self.undesiredReq  = true;
			self.commentsSwitch = true;
			break;
		}
		
		switch(ques.IsImagesRequired){
		case 1:
			self.imageSwitch = true;
			self.imageRequired = true;
			self.undesiredImgReq  = true; 
			break;
		case 3:
			self.imageSwitch = true;
			self.undesiredImgReq  = true; 
			break;
		}
	}

	
	self.cancel = function () {
		$uibModal.open({
			animation: false,
			templateUrl: 'changesWarning.html',
			controller: 'questionChangesWarningCtrl',
			windowClass: 'changes-warning-modal',
			controllerAs: 'scwModal',
		}).result.then(function () {
			$uibModalInstance.dismiss('cancel');
		}, function(){
			
		});
	};
	
	self.ok = function () {
		// Do processing
		for (var i=0;i<self.responseRatioOptions.length;i++){
			if(self.responseRatioOptions[i].active){
				var responseRatio = {};
				responseRatio.Ratio = self.responseRatioOptions[i].value;
				responseRatio.ValueMatch = self.responseRatioOptions[i].label;
				self.question.ResponseRatios.push(responseRatio);
			}
		}
		// process comments required and image required flags
		self.processReqChecks();
		self.question.MaxImagesAllowed = self.imageCount;
		console.log(self.question);
		$uibModalInstance.close(self.question);
	};
	
	self.processReqChecks = function () {
		if(self.commentRequired && self.undesiredReq){
			self.question.IsCommentRequired = 1;
		} else if(!self.commentRequired && self.undesiredReq){
			self.question.IsCommentRequired = 3;
		} else{
			self.question.IsCommentRequired = 0;
		}
		
		if(self.imageRequired && self.undesiredImgReq){
			self.question.IsImagesRequired = 1;
		} else if(!self.imageRequired && self.undesiredImgReq){
			self.question.IsImagesRequired = 3;
		} else{
			self.question.IsImagesRequired = 0;
		}
	}
	self.updateImageCount = function (action) {
		if(action === 'down' && self.imageCount>0){
			self.imageCount--;
		}
		else if(action === 'up' && self.imageCount<4){
			self.imageCount++;
		}
	};
	
	self.bck = function () {
		$uibModal.open({
			animation:false,
			templateUrl: 'bckWarning.html',
			controller: 'questionBackWarningCtrl',
			windowClass: 'changes-warning-modal',
			controllerAs: 'sbwModal',
		}).result.then(function () {
			$uibModalInstance.close(null);
		}, function(){
			
		});
	};

	self.setCommentsRequired = function(type){
		if(type == "req" && self.commentRequired){
			self.undesiredReq = true;
		}else if(type == "req" && !self.commentRequired){
			self.undesiredReq = false;
		}
	};
	
	self.setImageRequired = function(type){
		if(type === "req" && self.imageRequired){
			self.undesiredImgReq = true;
		}else if(type === "req" && !self.imageRequired){
			self.undesiredImgReq = false;
		}
	};
	
	self.changeCommentsSwitch = function () {
		if(!self.commentsSwitch){
			self.commentRequired  = false;
			self.undesiredReq = false;
			self.question.CommentHint = '';
		}
	};
	
	self.changeImageSwitch = function () {
		if(!self.commentsSwitch){
			self.imageRequired  = false;
			self.undesiredImgReq = false;
			self.imageCount = 1;
		}
	};
	
	init();
})
   .controller('questionChangesWarningCtrl', function ($uibModalInstance) {

	  	var self = this;
	  	self.ok = function () {
	  		$uibModalInstance.close();
		};

		self.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		};

  })
  
    .controller('questionBackWarningCtrl', function ($uibModalInstance) {

	  	var self = this;
	  	self.ok = function () {
	  		$uibModalInstance.close();
		};

		self.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		};

  });