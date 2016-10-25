'use strict';

angular.module('palauteUiApp')

    .controller('IndexController', ['$scope', '$stateParams', 'feedbackFactory', function($scope, $stateParams, feedbackFactory){

        // TODO: Provide real dynamic input params

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

    .controller('HandledController', ['$scope', '$stateParams', 'feedbackFactory', function($scope, $stateParams, feedbackFactory){

        // TODO: Provide real dynamic input params
        
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

	.controller('FeedbackDetailController', ['$scope', '$rootScope', '$stateParams', 'feedbackFactory', '$state', function($scope, $rootScope, $stateParams, feedbackFactory, $state){

        console.log("Initializing FeedbackDetailController");

        $scope.myComment = {};
        $scope.transfer = {};
        $scope.answer = {};
        $scope.inform = {};

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

        $scope.submitComment = function() {

            // TODO: Use logged in user name

            var myNewComment = 
                {
                    date : new Date().toISOString(),
                    author : "Juha",
                    text : $scope.myComment.text
                };

            $scope.feedback.comments.push( myNewComment );
            
            // TODO: Save comment to database

            $scope.myComment = {};
        }

        $scope.feedbackHasComments = function() {
            return $scope.feedback && $scope.feedback.comments && $scope.feedback.comments.length > 0;
        }

        $scope.transferFeedback = function() {
            
            // TODO: Store transfer request to backend

            $scope.transfer.feedbackid = $scope.feedback.id;
            $scope.transfer.userid = 1;

            console.log($scope.transfer);
            
            $state.go('app.feedbackdetails');

            $scope.transfer = {};
        }

        $scope.answerFeedback = function() {

            $scope.answer.feedbackid = $scope.feedback.id;
            $scope.answer.userid = 1;

            $rootScope.answer = $scope.answer;
            
            $state.go('app.feedbackdetails.answer.select');
        }

        $scope.sendAnswer = function() {

            // TODO: Store answer to backend

            console.log("Send answer");
            console.log($rootScope.answer);
            $rootScope.answer = {};
            $scope.answer = {};
            $state.go('app.feedbackdetails');
        }

        $scope.sendIntermediateAnswer = function() {

            // TODO: Store intermediate answer to backend

            console.log("Send intermediate answer");
            console.log($rootScope.answer);
            $rootScope.answer = {};
            $scope.answer = {};
            $state.go('app.feedbackdetails');
        }

        $scope.sendFeedbackInform = function() {

            console.log("Send feedback as info");
            console.log($scope.inform);

            $scope.inform = {};
            $state.go('app.feedbackdetails');
        }

	}])

;