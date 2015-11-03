'use strict';

angular.module('sureAuditAdminApp')
	.directive('setWidth', function () {
		return {
			restrict: 'A',
			link: function (scope, iElement) {
				var totalHeight = $(window).width();
				$(iElement).width(totalHeight);
			}
		};
});