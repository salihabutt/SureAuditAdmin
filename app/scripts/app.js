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
    'blockUI'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider, localStorageServiceProvider, blockUIConfig) {
	blockUIConfig.message = 'Please Wait ...';

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

    // change block-ui message


 // $urlRouterProvider.otherwise("/home");
  
 
  cfpLoadingBarProvider.includeSpinner = false;
  localStorageServiceProvider.setStorageType('localStorage');
  })
.run(function ($rootScope,  $httpProvider, authService, errorService, $state) {
	 $httpProvider.interceptors.push('authInterceptorService');
    authService.fillAuthData();
    if(authService.authentication.isAuth){
    	$state.go('home');
    }else{
    	$state.go('login');
    }
    // ALl application errors are store in rootScope
    $rootScope.errors = errorService;
   		
});

