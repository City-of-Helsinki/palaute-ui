/* jshint node: true */
//'use strict';
(function(){
    "use strict";
/*
Currently there are 3 controller components
1. IndexController, used for listing feedbacks in the entry page
2. HandledController, used for listing feedbacks in the 'handled' view
3. FeedbackDetailController, used for displaying and managing a single feedback

Still missing:
1. LoginController, used for providing login/logout functionality

$scope and $rootScope are visibility planes on which functions and variables can be stored.
1. The $scope refers to the DOM elements defined for the current controller (see scripts/app.js for definitions)
2. The $rootScope is the parent scope of all controller $scope definitions (shared)
*/

angular.module('palauteUiApp')

    .controller('IndexController', ['$scope', '$rootScope', '$stateParams', 'feedbackFactory', 
      function($scope, $rootScope, $stateParams, feedbackFactory){

        // TODO: Provide real dynamic input params
        // TODO: Use actual backend for data retrieval for a feedback list
        
        // Shared state used to enable tab selection using more than one controller
        $rootScope.tab = 1;

        // Check scripts/services.js for feedbackFactory implementation
    	feedbackFactory.getFeedbacks().get({id:$stateParams.userid})
    		.$promise.then(
				function(response){
                    
                    // The list of feedbacks is 'feedbacks' array inside the returned json ('response')
                    $scope.feedbacks = response.feedbacks;

            	},
            	function(response) {
            		console.log("Error on feedbacks: "+response.status + " " + response.statusText);
                	$scope.feedbackmessage = "Error on feedbacks: "+response.status + " " + response.statusText;
            	}
    		);

        // If navbar is changed to tabbed navigation, rootScope might not be required 
        // and the functionality of IndexController and HandledController could be fused into a single 
        // controller. Check views/header.html for provided implementation.

        // Shared state used to enable tab selection using more than one controller
        $rootScope.select = function(selected) {
            $rootScope.tab = selected;
        };

        // Shared state used to enable tab selection using more than one controller
        $rootScope.isSelected = function(checkTab) {
            return ($rootScope.tab === checkTab);
        };

	}])

    .controller('HandledController', ['$scope', '$rootScope', '$stateParams', 'feedbackFactory', 
      function($scope, $rootScope, $stateParams, feedbackFactory){

        // TODO: Provide real dynamic input params

        // Shared state used to enable tab selection using more than one controller
        $rootScope.tab = 2;

        // Check scripts/services.js for feedbackFactory implementation
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

	.controller('FeedbackDetailController', ['$scope', '$rootScope', '$stateParams', 'feedbackFactory', '$state', 
      function($scope, $rootScope, $stateParams, feedbackFactory, $state){

        $scope.myComment = {};
        $scope.transfer = {};
        $scope.answer = {};
        $scope.inform = {};

        // TODO: Use the actual backend for data retrieval for a single feedback

        // Check scripts/services.js for feedbackFactory implementation
    	feedbackFactory.getFeedbacks().get({id:$stateParams.userid})
    		.$promise.then(
				function(response){
                    for(var i=0; i<response.feedbacks.length; i++) {
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
        };

        $scope.feedbackHasComments = function() {
            return $scope.feedback && $scope.feedback.comments && $scope.feedback.comments.length > 0;
        };

        $scope.transferFeedback = function() {
            
            // TODO: Store transfer request to backend

            $scope.transfer.feedbackid = $scope.feedback.id;
            $scope.transfer.userid = 1;

            console.log($scope.transfer);
            
            $state.go('app.feedbackdetails');

            $scope.transfer = {};
        };

        $scope.answerFeedback = function() {

            $scope.answer.feedbackid = $scope.feedback.id;
            $scope.answer.userid = 1;

            $rootScope.answer = $scope.answer;
            
            $state.go('app.feedbackdetails.answer.select');
        };

        $scope.sendAnswer = function() {

            // TODO: Store answer to backend

            console.log("Send answer");
            console.log($rootScope.answer);
            $rootScope.answer = {};
            $scope.answer = {};
            $state.go('app.feedbackdetails');
        };

        $scope.sendIntermediateAnswer = function() {

            // TODO: Store intermediate answer to backend

            console.log("Send intermediate answer");
            console.log($rootScope.answer);
            $rootScope.answer = {};
            $scope.answer = {};
            $state.go('app.feedbackdetails');
        };

        $scope.sendFeedbackInform = function() {

            // TODO: Use backend for feedback informing

            console.log("Send feedback as info");
            console.log($scope.inform);

            $scope.inform = {};
            $state.go('app.feedbackdetails');
        };

	}])

;
})();