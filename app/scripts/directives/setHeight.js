'use strict';

angular.module('sureAuditAdminApp')
	.directive('setHeight', function () {
		return {
			restrict: 'A',
			link: function (scope, iElement) {
				var totalHeight = $(window).height();
				$(iElement).height(totalHeight);
			}
		};
	})