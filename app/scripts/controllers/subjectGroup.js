'use strict';


angular.module('sureAuditAdminApp')
	.controller('subjectGroupCtrl',  function (SubjectGroupService) {
		var self = this,
		init= function () {
			SubjectGroupService.getDataGroup().then(function(response){
				self.data = response.Data;
				console.log(self.data)
			},function(){

			});
			
		};
		init();
});