'use strict';

angular.module('palauteUiApp', ['ui.router', 'ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url:'/user/:userid',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/worklist.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                    	templateUrl : 'views/footer.html'
                    }
                }

            })

            .state('app.handled', {
                url:'/handled',
                views: {
                    'content@': {
                        templateUrl : 'views/handled.html',
                        controller  : 'HandledController'                  
                    }
                }
            })

            .state('app.feedbackdetails', {
                url: '/feedback/:feedbackid',
                cache: true,
                views: {
                    'content@': {
                        templateUrl : 'views/feedback.html',
                        controller  : 'FeedbackDetailController'
                   }
                }
            })

            .state('app.feedbackdetails.transfer', {
                url: '/transfer',
                cache: true,
                views: {
                    'content@': {
                        templateUrl : 'views/transfer.html',
                        controller  : 'FeedbackDetailController'
                   }
                }
            })

            .state('app.feedbackdetails.answer', {
                url: '/answer',
                cache: true,
                views: {
                    'content@': {
                        templateUrl : 'views/answer.html',
                        controller  : 'FeedbackDetailController'
                   }
                }
            })

            .state('app.feedbackdetails.answer.select', {
                url: '/answer/select',
                cache: true,
                views: {
                    'content@': {
                        templateUrl : 'views/answer-select.html',
                        controller  : 'FeedbackDetailController'
                   }
                }
            })

            ;
    
        $urlRouterProvider.otherwise('/user/1');
    })
;
