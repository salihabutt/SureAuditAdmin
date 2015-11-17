'use strict';

angular.module('sureAuditAdminApp')
	.directive('checkUndesired', function () {
		return {
			restrict: 'A',
			link: function (scope, iElement, attrs) {
				var cls = attrs.toggleClass;
				$(iElement).click(function(){
					$(this).parent().next().find('input:checkbox').disabled = true;
				});

								
			}
		};
});