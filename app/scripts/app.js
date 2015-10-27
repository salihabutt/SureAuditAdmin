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
	  'sureAudit':'https://sureaudit-dev.propelics.com',
	  'serviceBase': '/api/v1/',
	  'contentType':'application/x-www-form-urlencoded',
	  'acceptType':'application/json'
  })
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  //
  // For any unmatched url, redirect to /state1

  $urlRouterProvider.otherwise("/login");

    // Setting up the states
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "views/login.html"
      })
    .state('home', {
      url: "/home",
      templateUrl: "views/home.html"
    });
    
	 $httpProvider.interceptors.push('authInterceptorService');
  })
.run(['authService', '$rootScope', function (authService, $rootScope) {
    authService.fillAuthData();
    // ALl application errors are store in rootScope
    $rootScope.errors = {};
    $rootScope.errors.loginFail='userName or password is invalid';		
}]);

