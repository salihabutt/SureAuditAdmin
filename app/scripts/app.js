'use strict';

/**
 * @ngdoc overview
 * @name sureAuditAdminApp
 * @description
 * # sureAuditAdminApp
 *
 * Main module of the application.
 */
var app = angular
  .module('sureAuditAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .constant('configurations',{
	  'custkey':'propelics',
	  'appkey':'sureaudit',
	  'devicekey':'tkxel',
	  'grant_type':'password',
	  'identity','https://identity-dev.propelics.com',
	  'serviceBase','https://sureaudit-dev.propelics.com',
	  'contentType','application/x-www-form-urlencoded',
	  'acceptType','application/json'
  })
  .config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  
    // Setting up the states
    $stateProvider
      .state('login', {
        url: "/",
        templateUrl: "views/login.html"
      });
  })
  .run(['$rootScope', '$injector', function($rootScope,$injector){ 
	  	$injector.get("$http").defaults.transformRequest = function(data, headersGetter){
	  	 debugger;
		  if ($rootScope.oauth) {
			  headersGetter()['Authorization'] = "Bearer "+$rootScope.oauth.access_token; 
		  }
		  if (data) { 
			  return angular.toJson(data);
		  }
		}; 		 
}); 
		  
		  