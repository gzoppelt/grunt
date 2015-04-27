angular.module('example-app', [
    'ui.router',
    'templates-app',
    'example-app.login',
    'example-app.modules'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('root', {
                url: '/',
                template: '<div>{{ cTest.statement }}</div>',
                controller: 'TestController as cTest'
            })
        ;
        $urlRouterProvider.otherwise('/');
    })

    .controller('TestController', function (debug) {
        var cTest = this;
        //debug('Das ist wichtig!');
        cTest.statement = 'This is the application root.';
        cTest.loginMessage='This will be the login form.';
    })
;