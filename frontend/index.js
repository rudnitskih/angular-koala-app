// init main module with dependecies
var app = angular.module('starwars-info', [
    'ui.router',
    'ngResource'
]);

// configure ui-router: https://ui-router.github.io/ng1/ 
app.config(function($stateProvider){
    $stateProvider
        .state({
            name: 'home',
            url: '/home',
            templateUrl: './views/main.view.html'
          })
});

// service for getting data from swapi.co
angular.module('starwars-info').factory('swApi', function($resource){
	return {
		getPlanet: function(id) {
			var planet =  $resource.get('//swapi.co/api/planet/');
			return planet;
		},

		getVehicle: function(id) {
			var VehicleResource = $resource('//swapi.co/api/vehicles/:id');
			
			var vehicles = VehicleResource.get({id: id});
			
			return vehicles.$promise;
		} 
	}
});

// controller for getting vehicles
app.controller('tableRendererController', function($scope, swApi){
	swApi.getVehicle().then(function(vehiclesResource){
		$scope.vehicles = vehiclesResource.results;
	});
});

// directive for rendering vehicles
app.directive('tableRenderer', function(){
	return {
		restrict: 'E',
		templateUrl: './table-renderer.html',
		controller: 'tableRendererController'
	}
});