'use strict';

angular.module('palauteUiApp', ['ui.router', 'ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/home.html',
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
                url: '/feedback/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'FeedbackDetailController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;
