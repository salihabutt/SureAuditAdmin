'use strict';

angular.module('sureAuditAdminApp')
.factory('groupAssoicationModel', function (utilityService) {
	
		return {
			  CustomerId: utilityService.getUserProfile()['p:custid'],
			  CustomerKey: utilityService.getUserProfile()['p:custkey'],
			  Name: '',
			  Status: 'OK',
			  UserGroups: [],
			  SubjectGroups:[],
			  AuditGroups: [],
			  Permissions: [],
			  TouchInfo: {
				  CreatedDate:  new Date(),
				  ModifiedDate: new Date()
			  }
				  
		};
});