angular.module("MyApp").controller('userController',['$scope','$http', '$location', function listar($scope, $http, $location){
	$scope.facebookUser = JSON.parse(window.sessionStorage.getItem("facebookUser"));
	console.log($scope.facebookUser);
	var nomes = $scope.facebookUser.name.split(" ");
	$scope.usuario = {};
	$scope.usuario.firstName = nomes[0];
	$scope.usuario.lastName = nomes[1];

	$http({
		
		method: "get",
		url: "http://localhost:8080/usuario/listar/",
		
   		headers: {'Content-Type': 'application/json'},
		//responseType: "json",
		 //crossDomain: true,

		}).then(function(data){
			$scope.retorno = data;
			console.log(data)
		});
	$scope.submitForm = function(usuario){
		
		usuario.facebookID = $scope.facebookUser.id;
		usuario.facebookName = $scope.facebookUser.name;

		var send = angular.toJson(usuario);
		console.log(send);
		$http({
		data: send,
		method: "post",
		url: "http://localhost:8080/usuario/criar/",
		
   		headers: {'Content-Type': 'application/json'},
		//responseType: "json",
		 //crossDomain: true,

		}).then(function(data){
			$scope.retorno = data;
			console.log(data)
			//window.location.href = "/Servico/detalhar.html#/?servicoID="+servicoID;
		});
		
	};

}]);

angular.module("MyApp").controller('userLogadoController',['$scope','$http', '$location', '$cookies', function getLogado($scope, $http, $location, $cookies){
	$http({
		method: "GET",
		url: path+"usuarios/ativo",
   		headers: {
   			"authorization": 'Bearer ' + $cookies.get("access_token"),
   			'Content-Type': 'application/json'
   		},
		

	}).then(function(data){
		$scope.requestUser = data;
		console.log(data)
	})
		
}]);