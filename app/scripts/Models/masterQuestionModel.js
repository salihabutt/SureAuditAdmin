'use strict';

angular.module('sureAuditAdminApp')
	.factory('masterQuestionModel', function ($http, $q, configurations) {
		
		var masterQuestionModel = {
				  CustomerId: '',
				  CustomerKey: '',
				  TypeKey: '',
				  Key: '',
				  Name: '',
				  Text: '',
				  Hint: '',
				  ResponseFormat: ''
		};
		
		return masterQuestionModel;
	});