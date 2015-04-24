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
                template: '<div>This is the application root.</div>'
            })
        ;
        $urlRouterProvider.otherwise('/');
    })

    .controller('TestController', function (debug) {
        debug('Das ist wichtig!');
    })
;