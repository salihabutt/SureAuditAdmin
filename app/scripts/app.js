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
	  'custKey':'propelics',
	  'appKey':'sureaudit',
	  'deviceKey':'tkxel',
	  'grantType':'password',
	  'identity':'https://identity-dev.propelics.com',
	  'serviceBase':'https://sureaudit-dev.propelics.com',
	  'contentType':'application/x-www-form-urlencoded',
	  'acceptType':'application/json'
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
      })
    .state('home', {
        url: "/home",
        templateUrl: "views/home.html"
      })
  })
  .run(['authService', function (authService) {
    authService.fillAuthData();
}]);

 
		

