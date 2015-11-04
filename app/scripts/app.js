'use strict';

/**
 * @ngdoc overview
 * @name sureAuditAdminApp
 * @description
 * # sureAuditAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sureAuditAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'angular-loading-bar',
    'LocalStorageModule',
    'angular-jwt',
    'blockUI',
    'ui.bootstrap'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider, localStorageServiceProvider, blockUIConfig) {
	  $stateProvider
	  .state('main', {
		    url: '/',
		    templateUrl: 'views/main.html',
		    abstract: true
		  })
		  .state('login', {
		        url: '/login',
		        templateUrl:'views/login.html'
		  })
		  .state('home', {
		      url: 'home',
		      parent: 'main',
		      views: {
		    	  'content': {
		    		templateUrl: 'views/home.html'
		    	  }
		      }
		   })
		  .state('profile', {
		      url: 'profile',
		      parent: 'main',
		      views: {
		        'content': {
		        	templateUrl: 'views/profile.html'
		        }
		      }
		   })
		  .state('appSetting', {
			  url: 'appsetting',
			  parent: 'main',
			  views: {
				  'content': {
					templateUrl: 'views/appSetting.html'
				  }
			  }
		  })
      .state('masterQuestion', {
        url: 'masterQuestion',
        parent: 'main',
        views: {
          'content': {
            templateUrl: 'views/masterQuestion.html'
          }
        }
     });

   /* *************************** Other configurations ************************************* */
	  blockUIConfig.message = 'Please Wait ...';
	  $httpProvider.interceptors.push('authInterceptorService');
	  cfpLoadingBarProvider.includeSpinner = false;
	  localStorageServiceProvider.setStorageType('localStorage');
  })
.run(function ($rootScope, authService, errorService, $state) {
	console.log('run method');
    authService.fillAuthData();
    if(authService.authentication.isAuth){
    	$state.go('home');
    }else{
    	$state.go('login');
    }
    // ALl application errors are store in rootScope
    $rootScope.errors = errorService;
   		
});

