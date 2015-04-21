angular.module('example-app', [
  'example-app.login',
  'ui.router',
  'templates-app',
  'example-app.modules'
])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('root', {
        url: '/',
        template: '<div>{{test.statement}}</div>',
        controller: 'TestCtrl as test'
      });

    $urlRouterProvider.otherwise('/');
  })

  .controller('TestCtrl', function(debug) {
    debug('say it is so.');
    this.statement = 'This is the application root.'
  })

;