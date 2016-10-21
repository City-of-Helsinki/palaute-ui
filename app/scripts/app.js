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
                url:'/user/:userid/handled',
                views: {
                    'content@': {
                        templateUrl : 'views/handled.html',
                        controller  : 'HandledController'                  
                    }
                }
            })

            .state('app.feedbackdetails', {
                url: '/feedback/:feedbackid',
                views: {
                    'content@': {
                        templateUrl : 'views/feedback.html',
                        controller  : 'FeedbackDetailController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/user/1');
    })
;
