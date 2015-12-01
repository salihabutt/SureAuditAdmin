'use strict';

angular.module('sureAuditAdminApp')
.controller('AddBranchingQuestionDetailCtrl', function ($uibModal, $uibModalInstance, action, branch,question,isScored) {

	var self = this,
	init = function () {
		self.branch = branch;
		self.subject = 'Add Branching Question';
		self.bquestion = question;
		self.isDisabled = true;
		switch(branch.Type){
		case 'yesno':
			self.selectedOption = null;
			break;
		case 'yesnona':
			self.selectedOption = null;
			break;
		case 'numeric':
			self.initNumeric();
			break;
		case 'rating':
			self.initRating();
			break;
		}
		
		if(action === 'edit'){
			self.editMode();
			self.isDisabled = false;
		}
	};

	self.initNumeric = function () {
		self.leftList = ['Greater than or equal to','Equal to','Less than'];
		self.rightList = ['None','Less than'];
		self.leftSelected = 'Greater than or equal to';
		self.rightSelected = 'Less than';
		self.leftVal = null;
		self.rightVal = null;
		self.rightDisable = false;
	};
	
	self.initRating = function () {
		self.leftRatingList = ['Greater than or equal to','Equal to','Less than'];
		self.rightRatingList = ['None','Less than'];
		self.leftRatingSelected = 'Greater than or equal to';
		self.rightRatingSelected = 'Less than';
		self.rightRatingDisable = false;
		self.rightCount = 0;
		self.leftCount = 0;
	};
	
	self.updateCount = function (type,action){
		if(type === 'left' && action ==='up'){
			if(self.leftCount<5){
			self.leftCount++;
			}
		} else if(type === 'left' && action ==='down'){
			if(self.leftRatingSelected === 'Less than'){
				if(self.leftCount>1){
					self.leftCount--;
				}
			} else{
				if(self.leftCount>0){
					self.leftCount--;
				}
			}
		}else if(type === 'right' && action ==='up'){
			if(self.rightCount<5){
				self.rightCount++;
				}
			} else if(type === 'right' && action ==='down'){
				if(self.rightCount>0){
					self.rightCount--;
				}
			}
	};
	
	self.setMiniVal = function () {
		if(self.leftRatiingSelected === 'Less than'){
			if(self.leftCount === 0){
				self.leftCount = 1;
			}
		}
	};
	
	self.checkDisabled = function(){
		self.isDisabled = true;
		for(var i=0;i< self.branch.AllowableValues.length;i++){
			if(self.branch.AllowableValues[i].IsDefault){
				self.isDisabled = false;
			}
		}
	};
	
	self.editMode = function () {
		self.subject = 'Edit Branching Question';
		switch(self.branch.Type){
		case 'yesno':
			self.populateYesNoNa();
			break;
		case 'yesnona':
			self.populateYesNoNa();
			break;
		case 'numeric':
			self.populateNumeric();
			break;
		case 'rating':
			self.populateRating();
			break;
		}
		
	};
	
	self.populateYesNoNa = function (){
		for(var i=0;i< self.branch.AllowableValues.length;i++){
			if(self.branch.AllowableValues[i].IsDefault){
				self.selectedOption = self.branch.AllowableValues[i].Value;
			}
		}
		
	};
	
	self.populateNumeric = function () {
		self.rightDisable = false;
		if(self.branch.UpperValueLimitExclusive === null && self.branch.LowerValueLimitInclusive !== null){
			self.leftSelected = 'Greater than or equal to';
			self.rightSelected = 'None';
			self.leftVal = self.branch.LowerValueLimitInclusive;	
			self.rightVal = self.branch.UpperValueLimitExclusive;
			
		} 
		else if(self.branch.LowerValueLimitInclusive === null && self.branch.UpperValueLimitExclusive !== null){
			self.leftSelected = 'Less than';
			self.rightSelected = 'Less than';
			self.rightDisable = true;
			self.leftVal = self.branch.UpperValueLimitExclusive;	
			self.rightVal = null;
		}
		else {
			self.leftSelected = 'Equal to';
			self.leftVal = self.branch.AllowableValues[0].Value;
			self.rightVal = null;
			self.rightDisable = true;
		}
	};
	
	self.populateRating = function () {
		self.rightRatingDisable = false;
		if(self.branch.UpperValueLimitExclusive === null && self.branch.LowerValueLimitInclusive !== null){
			self.leftRatingSelected = 'Greater than or equal to';
			self.rightRatingSelected = 'None';
			self.leftCount = self.branch.LowerValueLimitInclusive;	
			self.rightCount = self.branch.UpperValueLimitExclusive;
			
		} 
		else if(self.branch.LowerValueLimitInclusive === null && self.branch.UpperValueLimitExclusive !== null){
			self.leftRatingSelected = 'Less than';
			self.rightRatingSelected = 'Less than';
			self.rightRatingDisable = true;
			self.leftCount = self.branch.UpperValueLimitExclusive;	
			self.rightCount = null;
		}
		else {
			self.leftRatiingSelected = 'Equal to';
			self.leftCount = self.branch.AllowableValues[0].Value;
			self.rightCount = null;
			self.rightRatingDisable = true;
		}
	};
	
	self.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
	self.saveBranch = function () {
		switch(self.branch.Type){
		case 'yesno':
			self.saveYesNoNa();
			break;
		case 'yesnona':
			self.saveYesNoNa();
			break;
		case 'numeric':
			self.saveNumeric();
			break;
		case 'rating':
			self.saveRating();
			break;
		}
	};
	
	self.saveYesNoNa = function () {
		for(var i=0;i<self.branch.AllowableValues.length;i++){
			self.branch.AllowableValues[i].IsDefault = false;
			if(self.selectedOption === self.branch.AllowableValues[i].Value){
				self.branch.AllowableValues[i].IsDefault = true;
			}
		}
	};
	self.saveNumeric = function () {
	/*	self.branch.LowerValueLimitInclusive = self.leftVal;
		self.branch.UpperValueLimitExclusive = self.rightVal;
		if(self.rightDisable){
			self.branch.UpperValueLimitExclusive = null;
		}*/
		if(self.leftSelected === 'Greater than or equal to'){
			if(self.rightSelected === 'None'){
				self.branch.LowerValueLimitInclusive = self.leftVal;
				self.branch.UpperValueLimitExclusive = null;
			}else{
				self.branch.LowerValueLimitInclusive = self.leftVal;
				self.branch.UpperValueLimitExclusive = self.rightVal;
			}
		}
		else if (self.leftSelected === 'Less than'){
			self.branch.UpperValueLimitExclusive = self.leftVal;
			self.branch.LowerValueLimitInclusive = null;
		} else if(self.leftSelected === 'Equal to'){
			self.branch.LowerValueLimitInclusive = null;
			self.branch.UpperValueLimitExclusive = null;
			var allowableValue = {};
			allowableValue.Value = self.leftVal;
			self.branch.AllowableValues.push(allowableValue);
		}
	};
	
	self.saveRating = function () {
		self.branch.LowerValueLimitInclusive = self.leftCount;
		self.branch.UpperValueLimitExclusive = self.rightCount;
		if(self.leftRatingSelected === 'Greater than or equal to'){
			if(self.rightSelected === 'None'){
				self.branch.LowerValueLimitInclusive = self.leftCount;
				self.branch.UpperValueLimitExclusive = null;
			}else{
				self.branch.LowerValueLimitInclusive = self.leftCount;
				self.branch.UpperValueLimitExclusive = self.rightCount;
			}
		}
		else if (self.leftRatingSelected === 'Less than'){
			self.branch.UpperValueLimitExclusive = self.leftVal;
			self.branch.LowerValueLimitInclusive = null;
		} else if(self.leftRatingSelected === 'Equal to'){
			self.branch.LowerValueLimitInclusive = null;
			self.branch.UpperValueLimitExclusive = null;
			var allowableValue = {};
			allowableValue.Value = self.leftVal;
			self.branch.AllowableValues.push(allowableValue);
		}
	};
	
	self.singleSelect = function (index){	
		for(var i=0;i<self.branch.AllowableValues.length;i++){
			if(i === index){
				self.branch.AllowableValues[i].IsDefault = !self.branch.AllowableValues[i].IsDefault;
			} else{
				self.branch.AllowableValues[i].IsDefault = false;
			}
			
		}
	};
	
	self.cleanBranch = function () {
		self.branch.LowerValueLimitInclusive = null;
		self.branch.UpperValueLimitExclusive = null;
		self.branch.AllowableValues = [];
		self.branch.IsCommentRequired = null;
		self.branch.CommentHint = null;
		self.branch.IsImagesRequired = null;
		self.branch.MaxImagesAllowed = null;
		self.branch.ImagesHint = null;
		self.branch.IsActionItemRequired = null;
	};
	
	self.next = function (){
		self.saveBranch();
		$uibModal.open({
			animation: true,
			templateUrl: 'views/addSurveyQuestionDetail.html',
			controller: 'AddSurveyQuestionDetailCtrl',
			windowClass: 'survey-questiondetail-modal',
			controllerAs: 'sqdModal',
			resolve:{
				ques: function () {
					return self.bquestion;
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
				if(action !== 'edit'){
					self.branch.Questions.push(question);
				}
				$uibModalInstance.close(self.branch);
			} 
		}, function (){

		});
		
	};
	
	self.back = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
	init();
});