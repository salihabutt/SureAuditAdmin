'use strict';

angular.module('sureAuditAdminApp')
.controller('AddBranchingQuestionDetailCtrl', function ($uibModal, $uibModalInstance, action, branch,question,isScored) {

	var self = this,
	init = function () {
		self.branch = branch;
		self.subject = 'Add Branching Question';
		self.question = question;
		switch(branch.Type){
		case 'yesno':
			self.initYesNo();
			break;
		}
	};
	
	self.initYesNo = function () {
		self.conditionList = ['Yes','No'];
		self.selectedOption = null;
	};
	self.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
	self.saveBranch = function () {
		switch(self.branch.Type){
		case 'yesno':
			break;
		}
	};
	
	self.saveYesNo = function () {
		allowableValue = {};
		allowableValue.Key = self.selectedOption;
		allowableValue.Label = self.selectedOption;
		allowableValue.Value = self.selectedOption;
		self.branch.AllowableValues.push(allowableValue);
	};
	
	self.cleanBranch = function () {
		self.branch.LowerValueLimitInclusive = null;
		self.branch.UpperValueLimitExclusive = null;
		self.branch.AllowableValues = [];
		self.branch.IsCommentRequired = null;
		self.branch.CommentHint = null;
		self.branch.IsImagesRequired = null;
		MaxImagesAllowed = null;
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
					return self.question;
				},
				action: function () {
					return action;
				},
				isScored: function () {
					return isScored;
				}
			}
		}).result.then(function (question){
			if(question == null){
				self.cleanBranch();
			}else{
				self.branch.Questions.push(question);
				$uibModalInstance.close(self.branch);
			}
		}, function (){
			//$uibModalInstance.dismiss('cancel');
		});
		
		self.back = function () {
			$uibModalInstance.dismiss('cancel');
		}
	};
	
	init();
});