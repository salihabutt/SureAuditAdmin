'use strict';

app.service('errorService',function () {
	this.errors = {
			loginFail: 'The username, password or customer ID you entered is incorrect. Please try again.'
	}
	return this.errors;

});