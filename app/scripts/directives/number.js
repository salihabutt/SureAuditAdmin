'use strict'; 
angular.module('sureAuditAdminApp')
.directive('numeric', function() {
        return function(scope, element) {

            $(element[0]).numericInput({ allowFloat: true });

        };
});