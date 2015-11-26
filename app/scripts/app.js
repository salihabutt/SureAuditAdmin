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
    'ui.bootstrap',
    'angularMoment',
    'xeditable',
    'uiSwitch'
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
	     })
		.state('survey', {
		  url: 'survey',
		  parent: 'main',
		  views: {
			  'content': {
				templateUrl: 'views/survey.html'
			  }
		  }
		})
		.state('addSurvey',{
			url: 'addsurvey/:id',
			parent: 'main',
			params: {
			    id: '',
			  },
			views: {
				  'content': {
					templateUrl: 'views/addSurvey.html'
				  }
			  }
		})
	
		.state('userGroups', {
			  url: 'usergroups',
			  parent: 'main',
			  views: {
				  'content': {
					templateUrl: 'views/userGroups.html'
				  }
			  }
			})
		.state('userGroupPermission', {
			  url: 'usergrouppermission/:id',
			  params: {
				    id: '',
				  },
			  parent: 'main',
			  views: {
				  'content': {
					templateUrl: 'views/userGroupPermissions.html'
				  }
			  }
		})
		.state('surveyGroups', {
		  url: 'surveyGroups',
		  parent: 'main',
		  views: {
			  'content': {
				templateUrl: 'views/surveyGroups.html'
			  }
		  }
		})
		.state('addSurveyGroup', {
		  url: 'addSurveyGroup/:id',
		  parent: 'main',
		  views: {
			  'content': {
				templateUrl: 'views/addSurveyGroups.html'
			  }
		  }
		})
		.state('subjectGroup', {
		  url: 'subjectGroup',
		  parent: 'main',
		  views: {
			  'content': {
				templateUrl: 'views/subjectGroup.html'
			  }
		  }
		});
   /* *************************** Other configurations ************************************* */
	  blockUIConfig.message = 'Please Wait ...';
	  $httpProvider.interceptors.push('authInterceptorService');
	  cfpLoadingBarProvider.includeSpinner = false;
	  localStorageServiceProvider.setStorageType('localStorage');
	  
  })
.run(function ($rootScope, authService, errorService, $state, editableOptions) {
	editableOptions.theme = 'bs3';
    authService.fillAuthData();
    if(authService.authentication.isAuth){
    	$state.go('home');
    }else{
    	$state.go('login');
    }
    // ALl application errors are store in rootScope
    $rootScope.errors = errorService;
   		
});

