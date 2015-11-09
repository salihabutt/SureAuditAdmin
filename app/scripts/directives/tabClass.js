'use strict';

angular.module('sureAuditAdminApp')
	.directive('tabClass', function () {
		return {
			restrict: 'A',
			link: function (scope, iElement) {

				$(iElement).click(function(event){
					$(".survey-info-box>ul>li.active").removeClass("active");
					var id = event.target.id;
					$('#'+id).parents("li:first").addClass('active tab-active');
				});

						
			}
		};
});