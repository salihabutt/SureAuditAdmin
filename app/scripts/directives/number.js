'use strict'; 
angular.module('sureAuditAdminApp')
.directive('numeric', function() {
        return function(scope, element, attrs) {

            $(element[0]).numericInput({ allowFloat: true });

        };
});