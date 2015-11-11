'use strict';

angular.module('sureAuditAdminApp')
	.directive('menuSibling', function () {
		return {
			restrict: 'A',
			link: function (scope, iElement) {

				$(iElement).mouseover(function(event){
					$(this).children('.gridOptions').show();
				});

				$(iElement).mouseout(function(event){
					$(this).children('.gridOptions').hide();
				});				
			}
		};
})
.directive('quesSibling', function () {
	return {
		restrict: 'A',
		link: function (scope, iElement) {

			$(iElement).mouseover(function(event){
				$(this).children('.quesGridOptions').show();
			});

			$(iElement).mouseout(function(event){
				$(this).children('.quesGridOptions').hide();
			});				
		}
	};
});