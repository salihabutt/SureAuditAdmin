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
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/login");
    //
    // Setting up the states
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "views/login.html"
      })

    .state('main', {
      abstract: true,
      url: "/",
      templateUrl: "views/main.html"
    })

    .state('main.home', {
      url: "home",
      templateUrl: "views/home.html"
    });
  });