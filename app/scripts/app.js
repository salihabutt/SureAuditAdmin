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
    'ui.router',
    'angular-loading-bar',
    'LocalStorageModule'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider, localStorageServiceProvider) {
	  
  $stateProvider
  .state('main', {
    url: '/',
    templateUrl: 'views/main.html',
    abstract: true
  })
  .state('login', {
        url: 'login',
        parent: 'main',
        views: {
        	'content': {
        		templateUrl:'views/login.html'
        	}
        }
   })
  .state('home', {
      url: 'home',
      parent: 'main',
      views: {
    	  'header': {
    		  templateUrl: 'views/header.html'
    	  },
    	  'content': {
    		  templateUrl: 'views/home.html'
    	  }
      }
   })
  .state('profile', {
      url: 'profile',
      parent: 'main',
      views: {
        'header': {
          templateUrl: 'views/header.html'
        },
        'content': {
          templateUrl: 'views/profile.html'
        }
      }
   })
  .state('appSetting', {
      url: 'appsetting',
      parent: 'main',
      views: {
        'header': {
          templateUrl: 'views/header.html'
        },
        'content': {
          templateUrl: 'views/app-setting.html'
        }
      }
   });
    
  $urlRouterProvider.otherwise("/home");
  
  $httpProvider.interceptors.push('authInterceptorService');
  cfpLoadingBarProvider.includeSpinner = false;
  localStorageServiceProvider.setStorageType('localStorage');
  })
.run(function ($rootScope, authService, errorService) {
    authService.fillAuthData();
    // ALl application errors are store in rootScope
    $rootScope.errors = errorService;
   		
});

