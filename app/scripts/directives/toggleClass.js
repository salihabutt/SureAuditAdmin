'use strict';

angular.module('sureAuditAdminApp')
	.directive('toggleClass', function () {
		return {
			restrict: 'A',
			link: function (scope, iElement, attrs) {
				var cls = attrs.toggleClass;
				$(iElement).click(function(){
					$(this).toggleClass(cls);
				});

								
			}
		};
});