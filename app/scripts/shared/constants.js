'use strict';


angular.module('sureAuditAdminApp')
 .constant('configurations',{
	'appKey':'sureaudit',
	'deviceKey':'tkxel',
	'grantType':'password',
	'grantType2':'refresh',
	'identity':'https://identity-dev.propelics.com',
	'sureAudit':'https://sureaudit-dev.propelics.com',
	'serviceBase': '/api/v1/',
	'contentType':'application/x-www-form-urlencoded',
	'acceptType':'application/json'
  });