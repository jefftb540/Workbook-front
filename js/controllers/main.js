angular.module("MyApp").controller('mainController',['$scope', '$mdSidenav', '$interval', '$http', '$cookies', function listar($scope, $mdSidenav, $interval, $http, $cookies){
	$scope.data={};
	$scope.qtdNotificacoes = 0

	$interval(function(){
		$http({
			method: "get",
			url: path+"notificacoes/count/",

			headers: {
	   			"authorization": 'Bearer ' + $cookies.get("access_token"),
	   			'Content-Type': 'application/json'
	   		},
		}).then(function(data){
			console.log(data)
			$scope.qtdNotificacoes = data.data;
		});
	}, 6000);

	$scope.openLeftMenu = function() {
		console.log("openLeftMenu called")
		$mdSidenav('left').toggle();
	};


	$scope.onSwipeLeft = function(ev) {
    	$scope.next();
    };

    $scope.onSwipeRight = function(ev) {
     	$scope.previous();
    };

    $scope.next = function() {

      $scope.data.selectedIndex = $scope.data.selectedIndex +1 ;
    };
    $scope.previous = function() {
      $scope.data.selectedIndex = $scope.data.selectedIndex -1;
    };


    $scope.range = function(count){

	  var ratings = []; 

	  for (var i = 0; i < count; i++) { 
	    ratings.push(i) 
	  } 

	  return ratings;
}

	$scope.toogleSearch = function(){
		$scope.showSearch = !$scope.showSearch
	}	
}]);

