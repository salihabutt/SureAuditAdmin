'use strict';

angular.module('sureAuditAdminApp')
	.directive('menuSibling', function () {
		return {
			restrict: 'A',
			link: function (scope, iElement) {

				$(iElement).click(function(event){
				     $(this).siblings().toggle();
				});			
			}
		};
});