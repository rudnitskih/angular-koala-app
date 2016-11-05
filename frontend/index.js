var app = angular.module('starwars-info', [
    'ui.router'
]);

app.config(function($stateProvider){
    $stateProvider
        .state({
            name: 'hello',
            url: '/hello',
            templateUrl: './views/main.view.html'
          })
});