'use strict';

angular.module('palauteUiApp')

    .controller('IndexController', ['$scope', '$stateParams', 'feedbackFactory', function($scope, $stateParams, feedbackFactory){

    	console.log("User : "+$stateParams.userid);

    	feedbackFactory.getFeedbacks().get({id:$stateParams.userid})
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

	.controller('FeedbackDetailController', ['$scope', '$stateParams', 'feedbackFactory', function($scope, $stateParams, feedbackFactory){

    	feedbackFactory.getFeedbacks().get({id:$stateParams.userid})
    		.$promise.then(
				function(response){
                    for(i=0; i<response.feedbacks.length; i++) {
                    	var feedback = response.feedbacks[i];

                    	if( feedback.id == Number($stateParams.feedbackid)) {
                    		$scope.feedback = feedback;
                    		break;
                    	}
                    }
                    if($scope.feedback) {
                    	// ok
                    } else {
                    	console.log("Feedback not found!");
                    	$scope.feedback = {};
                    }
            	},
            	function(response) {
            		console.log("Error on feedbacks: "+response.status + " " + response.statusText);
                	$scope.feedbackmessage = "Error on feedbacks: "+response.status + " " + response.statusText;
            	}
    		);
	}])

;