/*jshint strict: true*/

(function(){
    "use strict";

angular.module('palauteUiApp')
	.constant("baseURL","http://localhost:1234/")
	.service('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
		this.getFeedbacks = function() {
			return $resource(baseURL+"users/:id",null,  {'update':{method:'PUT' }});
		};
	}])

;
})();