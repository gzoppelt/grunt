angular.module('example-app', [
    'ui.router',
    'example-app.login',
    'templates-app'
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
;