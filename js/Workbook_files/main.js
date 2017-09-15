angular.module("MyApp").controller('mainController',['$scope', '$mdSidenav', function listar($scope, $mdSidenav){
	$scope.openLeftMenu = function() {
		$mdSidenav('left').toggle();
	};
}]);