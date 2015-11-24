'use strict';

angular.module('sureAuditAdminApp')
.controller('AddSurveyQuestionDetailCtrl', function ($uibModal, $uibModalInstance, ques, surveyModel, action, isScored, utilityService) {
	var self = this,
	init = function () {
		self.subject = 'Add Branching Question';
		
		self.defaultResp = '';
		self.undesiredResp = '';
		self.question = angular.copy(surveyModel.question);
		self.imageCount = 1;
		self.isScored = isScored;
		self.commentRequired = false;
		self.undesiredReq  = false;
		self.commentsSwitch = false;
		self.imageSwitch = false;
		self.imageRequired = false;
		self.undesiredImgReq  = false;
		
		switch(ques.TypeKey){
		case 'yesno':
			self.initYesNo();
			break;
		case 'yesnona':
			self.initYesNoNA();
			break;
		case 'text':
			self.initText();
			break;
		case 'numeric':
			self.initNumeric();
			break;
		case 'single':
			self.initSingle();
			break;
		case 'multiple':
			self.initMultiple();
			break;
		case 'rating':
			self.initRating();
			break;
			
		}
	
		if(action === 'add'){
			self.question.MasterId = ques.Id;
			self.question.Text = ques.Text;
			self.question.TypeKey = ques.TypeKey;
			self.question.Label = ques.Label;
			self.question.Name = ques.Name;
			self.question.Id = null;
		} else 	if(action === 'edit'){
			self.editMode();
		}

		self.isValid = false;
		
	};
	
	/***********************INITIALIZE MODELS*******************************/
	self.initYesNo = function () {
		self.undesiredRespList = ['Yes','No'];
		self.defaultRespList = ['Yes','No'];
		self.responseRatioOptions = [{label: 'Yes',active: false,value: null}, {label: 'No',active: false,value: null}];
	};
	self.initYesNoNA = function () {
		self.undesiredRespList = ['Yes','No','N/A'];
		self.defaultRespList = ['Yes','No','N/A'];
		self.responseRatioOptions = [{label: 'Yes',active: false,value: null}, {label: 'No',active: false,value: null}];
	};
	
	self.initText = function () {
		self.responseRatioTextOptions = [{label: 'Response',value: null}, {label: 'NoResponse',value: null}];	
	};
	
	self.initNumeric = function () {
		self.weights = []
		self.addWeigthCondition();
	};
	
	self.initSingle = function () {
		self.question.AllowableValues = ques.AllowableValues;
		if(isScored){
			self.responseRatioMultSing = [];
			for(var i=0;i<ques.AllowableValues.length;i++){
				var weight = {};
				weight.name = ques.AllowableValues[i].Value;
				weight.val = null;
				self.responseRatioMultSing.push(weight);
			}
		}
	};
	
	self.initMultiple = function () {
		self.question.AllowableValues = ques.AllowableValues;
		if(isScored){
			self.responseRatioMultSing = [];
			for(var i=0;i<ques.AllowableValues.length;i++){
				var weight = {};
				weight.name = ques.AllowableValues[i].Value;
				weight.val = null;
				self.responseRatioMultSing.push(weight);
			}
		}
	};
	
	self.initRating = function () {
		if(isScored){
			self.responseRatioRating = [];
			for(var i=0;i<6;i++){
				var resp = {};
				resp.val = null;
				resp.id = i;
				self.responseRatioRating.push(resp);
			}
		}
	};
	
/********************   EDit Model            ********************/	
	self.editMode = function () {
		self.subject = 'Edit Question';
		self.question = ques;
		self.imageCount =  ques.MaxImagesAllowed;
		self.setResponseRatiosForEdit(ques.TypeKey);
		switch(ques.CommentRequired){
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
		
		switch(ques.ImagesRequired){
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
	};
	

	self.setResponseRatiosForEdit = function(type){
		switch(type){
		case 'yesno':
				self.respRatioForYesNoNa();
			break;
		case 'yesnona':
				self.respRatioForYesNoNa();
			break;
		case 'text':
				self.respRatioForText();
			break;
		case 'numeric':
				self.respRatioForNumeric();
			break;
		case 'single':
				self.respRatioForMultipleSingle();
			break;
		case 'multiple':
				self.respRatioForMultipleSingle();
			break;
		case 'rating':
			self.respRatioForRating();
			break;
		}
	
	};

	
	self.respRatioForYesNoNa = function () {
		if(ques.ResponseRatios.length>0){
		for(var i =0;i<ques.ResponseRatios.length;i++){
			var obj = {};
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
	};
	
	self.respRatioForText = function () {
		if(ques.ResponseRatios.length>0){
		for(var i =0;i<ques.ResponseRatios.length;i++){
			var obj = {};
				if(ques.ResponseRatios[i].ValueMatch === '*'){
					self.responseRatioTextOptions[0].value = ques.ResponseRatios[i].Ratio;
				}
				else if (ques.ResponseRatios[i].ValueMatch === '' || ques.ResponseRatios[i].ValueMatch === null){
					self.responseRatioTextOptions[1].value = ques.ResponseRatios[i].Ratio;
				}
		}
		}
	};
	
	self.respRatioForNumeric = function () {
		if(ques.ResponseRatios.length>0){
			self.weights = [];
			for(var i=0;i<ques.ResponseRatios.length;i++){
				var weight = {};
				weight.left = ['Greater than or equal to','Equal to','Less than'];
				weight.right = ['None','Less than'];
				weight.leftSelected =  ques.ResponseRatios[i].ValueMatch;
				weight.rightSelected =  'Less than';
				weight.leftVal = ques.ResponseRatios[i].LowerInclusive;
				weight.rightRatio = ques.ResponseRatios[i].Ratio;
				if(ques.ResponseRatios[i].ValueMatch === 'Greater than or equal to'){
					weight.rightVal = ques.ResponseRatios[i].UpperExclusive;
					weight.rightDisable = false;
				} else{
					weight.rightDisable = true;
					weight.rightVal = '';
				}
				self.weights.push(weight);
			}
		}
	};
	
	self.respRatioForMultipleSingle = function () {
		if(ques.ResponseRatios.length>0){
			self.responseRatioMultSing = [];
			for(var i=0;i<ques.ResponseRatios.length;i++){
				var weight = {};
				weight.name = ques.ResponseRatios[i].ValueMatch;
				weight.val = ques.ResponseRatios[i].Ratio;
				self.responseRatioMultSing.push(weight);
			}
		}
	};
	
	self.respRatioForRating = function () {
		if(ques.ResponseRatios.length>0){
			self.responseRatioRating = [];
			for(var i=0;i<ques.ResponseRatios.length;i++){
				var resp = {};
				resp.id = ques.ResponseRatios[i].ValueMatch;
				resp.val = ques.ResponseRatios[i].Ratio;
				self.responseRatioRating.push(resp);
			}
		}
	};
	
	/**********************************************/
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
		self.isValid = true;
		// process comments required and image required flags
		self.processReqChecks();
		self.question.MaxImagesAllowed = self.imageCount;
		self.question.MinImagesAllowed = 1;
		console.log(self.question);
		switch(self.question.TypeKey) {
		case 'yesno':
			self.saveResponseRatioForYesNoNa();
			break;
		case 'yesnona':
			self.saveResponseRatioForYesNoNa();
			break;
		case 'text':
			self.validateTextresponse();
			self.saveResponseRatioForText();
			break;
		case 'numeric':
			self.validateNumericresponse();
			self.saveResponseRatioForNumeric();
			break;
		case 'single':
			self.saveResponseRatioForMultipleSingle();
			break;
		case 'multiple':
			self.saveResponseRatioForMultipleSingle();
			break;
		case 'rating':
			self.validateRating();
			self.saveResponseRatioForRating();
			break;
		}
		
		if(self.isValid){
		$uibModalInstance.close(self.question);
		}
	};
	
	self.saveResponseRatioForYesNoNa = function () {
		self.question.ResponseRatios = [];
		for (var i=0;i<self.responseRatioOptions.length;i++){
			if(self.responseRatioOptions[i].active){
				var responseRatio = {};
				responseRatio.Ratio = self.responseRatioOptions[i].value;
				responseRatio.ValueMatch = self.responseRatioOptions[i].label;
				self.question.ResponseRatios.push(responseRatio);
			}
		}	
	};
	
	self.saveResponseRatioForText = function () {
		self.question.ResponseRatios = [];
		for (var i=0;i<self.responseRatioTextOptions.length;i++){
			if(self.responseRatioTextOptions[i].value !== '' || self.responseRatioTextOptions[i].value !== null){
				var responseRatio = {};
				responseRatio.Ratio = self.responseRatioTextOptions[i].value;
				responseRatio.ValueMatch = self.responseRatioTextOptions[i].label === 'Response'?'*':'';
				self.question.ResponseRatios.push(responseRatio);
			}
		}	
	};
	
	self.saveResponseRatioForNumeric = function () {
		self.question.ResponseRatios = [];
		for(var i=0;i<self.weights.length;i++){
			var responseRatio = {};
			responseRatio.LowerInclusive = self.weights[i].leftVal;
			responseRatio.ValueMatch = self.weights[i].leftSelected;
			responseRatio.Ratio = self.weights[i].rightRatio;
			if(!self.weights[i].rightDisable){
				responseRatio.UpperExclusive = self.weights[i].rightVal;	
			}
			
			self.question.ResponseRatios.push(responseRatio);
		}	
	};
	
	self.saveResponseRatioForMultipleSingle = function () {
		self.question.ResponseRatios = [];
		for(var i=0;i<self.responseRatioMultSing.length;i++){
			if(!utilityService.isEmpty(self.responseRatioMultSing[i].val)){
				var responseRatio = {};
				responseRatio.ValueMatch = self.responseRatioMultSing[i].name;
				responseRatio.Ratio = self.responseRatioMultSing[i].val;
				self.question.ResponseRatios.push(responseRatio);
			}
		}		
	};
	
	self.saveResponseRatioForRating = function (){
		self.question.ResponseRatios = [];
		for(var i=0;i<self.responseRatioRating.length;i++){
				var responseRatio = {};
				responseRatio.ValueMatch = self.responseRatioRating[i].id;
				responseRatio.Ratio = self.responseRatioRating[i].val;
				self.question.ResponseRatios.push(responseRatio);
		}
	};
	
	self.validateTextresponse = function () {
		if(isScored){
			for (var i=0;i<self.responseRatioTextOptions.length;i++){
				if(utilityService.isEmpty(self.responseRatioTextOptions[i].value)){
					self.isValid = false;
					break
				}
			}
			if(!self.isValid){
				self.showWarning('Please enter response ratio.');
			}
			
		}
		if(self.question.MinResponseLength > self.question.MaxResponseLength){
			self.isValid = false;
			self.showWarning('Please enter valid min and/or max');
		}
	};
	
	self.validateNumericresponse = function () {
		if(isScored){
			for(var i=0;i<self.weights.length;i++){
				if(utilityService.isEmpty(self.weights[i].rightRatio)){
					self.isValid = false;
					break
				}
			}
			if(!self.isValid){
				self.showWarning('Please enter response ratio.');
			}
			
		}
		if(self.question.LowerValueLimitInclusive > self.question.UpperValueLimitExclusive){
			self.isValid = false;
			self.showWarning('Please enter valid min and/or max');
		}
	};
	
	self.validateRating = function () {
		var message = '';
		if(!utilityService.isEmpty(self.question.DefaultValue)){
			if(self.question.DefaultValue != 0 || self.question.DefaultValue!=1 || self.question.DefaultValue!=2 ||
				self.question.DefaultValue!=3 || self.question.DefaultValue!=4 || self.question.DefaultValue!=5){
				self.isValid = false;
				message = 'Please enter a valid value in the Set Default Response';
			}
			else if(self.question.DefaultValue != 0 || self.question.DefaultValue!=1 || self.question.DefaultValue!=2 ||
				self.question.DefaultValue!=3 || self.question.DefaultValue!=4 || self.question.DefaultValue!=5){
				self.isValid = false;
				message = 'Please enter a valid value in the Set Undesired Response';
			}
		}
		
		if(!self.isValid){
			self.showWarning(message);
		}
	};
	
	self.showWarning = function (msg) {
		$uibModal.open({
			animation: true,
			templateUrl: 'views/validationPopup.html',
			controller: 'validationsCtrl',
			windowClass: 'changes-warning-modal',
			controllerAs: 'vModal',
			resolve: {
				msg: function () {
					return  msg;
				}
			}
		});
	}
	
	self.processReqChecks = function () {
		if(self.commentRequired && self.undesiredReq){
			self.question.CommentRequired = 1;
		} else if(!self.commentRequired && self.undesiredReq){
			self.question.CommentRequired = 3;
		} else{
			self.question.CommentRequired = 0;
		}
		
		if(self.imageRequired && self.undesiredImgReq){
			self.question.IsImagesRequired = 1;
		} else if(!self.imageRequired && self.undesiredImgReq){
			self.question.ImagesRequired = 3;
		} else{
			self.question.ImagesRequired = 0;
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
	

	
	self.addWeigthCondition = function () {
		var weight= {};
		weight.left = ['Greater than or equal to','Equal to','Less than'];
		weight.right = ['None','Less than'];
		weight.leftSelected = 'Greater than or equal to';
		weight.rightSelected = 'Less than';
		weight.leftVal = null;
		weight.rightVal = null;
		weight.leftRatio = null;
		weight.rightRatio = null;
		weight.rightDisable = false;
		self.weights.push(weight);
	};
	
	self.defSingleSelect = function (index) {
		for(var i=0;i<self.question.AllowableValues.length;i++){
			if(i !== index){
				self.question.AllowableValues[i].IsDefault = false;
			}
		}
		self.question.AllowableValues[index].IsDefault = !self.question.AllowableValues[index].IsDefault;
	};
	
	self.undesSingleSelect = function (index) {
		for(var i=0;i<self.question.AllowableValues.length;i++){
			if(i !== index){
			self.question.AllowableValues[i].IsUndesireable = false;
			}
		}
			self.question.AllowableValues[index].IsUndesireable = !self.question.AllowableValues[index].IsUndesireable;
	};
	
	self.defMltplSelect = function (index) {
		if(self.question.AllowableValues[index].IsDefault === null){
			self.question.AllowableValues[index].IsDefault = true;	
		} else {
			self.question.AllowableValues[index].IsDefault = !self.question.AllowableValues[index].IsDefault;
		}
	};
	
	self.undesMltplSelect = function (index) {
		if(self.question.AllowableValues[index].IsUndesireable === null){
			self.question.AllowableValues[index].IsUndesireable = true;	
		} else {
			self.question.AllowableValues[index].IsUndesireable = !self.question.AllowableValues[index].IsDefault;
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