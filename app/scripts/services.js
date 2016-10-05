/*jshint strict: true*/
'use strict';

angular.module('palauteUiApp')
	.constant("baseURL","http://localhost:1234/")
	.service('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
		this.getFeedbacks = function() {
			console.log("fetching feedbacks resource");
			return $resource(baseURL+"users/:id",null,  {'update':{method:'PUT' }});
		};
	}])

;