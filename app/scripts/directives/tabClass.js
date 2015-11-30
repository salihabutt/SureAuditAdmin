'use strict';

angular.module('sureAuditAdminApp')
	.directive('tabClass', function () {
		return {
			restrict: 'A',
			link: function (scope, iElement) {

				$(iElement).click(function(event){
					var id = event.target.id;
					$('#'+id).parents("ul").find('li.active').removeClass('active')
					$('#'+id).parents('li:first').addClass('active tab-active');
				});

						
			}
		};
});