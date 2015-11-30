'use strict';


angular.module('sureAuditAdminApp')
	.controller('subjectGroupCtrl',  function (SubjectGroupService,$state) {
		var self = this,
		init= function () {
			SubjectGroupService.getDataGroup().then(function(response){
				self.data = response.Data;
				console.log(self.data)
			},function(){

			});
		};
		
		self.navigateSubGrpSettings = function (id){
			$state.go('subjectGroupSettings',{
				id:id
			})
		}
		init();
});