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

        $scope.myComment = {};
        $scope.commentsExist = false;

    	feedbackFactory.getFeedbacks().get({id:$stateParams.userid})
    		.$promise.then(
				function(response){
                    for(i=0; i<response.feedbacks.length; i++) {
                    	var feedback = response.feedbacks[i];

                    	if( feedback.id == Number($stateParams.feedbackid)) {
                    		$scope.feedback = feedback;
                            if( feedback.comments && feedback.comments.length > 0 ) {
                                $scope.commentsExist = true;
                            }
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

        $scope.submitComment = function() {

            var inputComment = {
                date : new Date().toISOString(),
                author : "Juha",
                text : $scope.myComment.text
            };


            $scope.feedback.comments.push( inputComment );

            $scope.myComment = "";
        }

        $scope.feedbackHasComments = function() {
            return $scope.feedback && $scope.feedback.comments && $scope.feedback.comments.length > 0;
        }

	}])

;