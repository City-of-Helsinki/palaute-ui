'use strict';

angular.module('palauteUiApp')

	        .controller('IndexController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory){

	        	feedbackFactory.getFeedbacks().get({id:1})
	        		.$promise.then(
						function(response){
	                        
	                        $scope.feedbacks = response.feedbacks;

                    	},
                    	function(response) {
                    		console.log("Error on feedbacks: "+response.status + " " + response.statusText);
                        	$scope.feedbackmessage = "Error on feedbacks: "+response.status + " " + response.statusText;
                    	}
	        		);
			}])

;