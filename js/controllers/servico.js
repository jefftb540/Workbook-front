angular.module("MyApp").controller('servicoController',['$scope','$http', '$cookies', function listar($scope, $http, $cookies){
	
	$http({
		method: "get",
		url: path+"servico/listar/",
		responseType: "json",
		 crossDomain: true,
		 headers:{
		 	"authorization": 'Bearer ' + $cookies.get("access_token"),
		 },
		}).then(function(data){
			$scope.servicos = data;
			console.log(data)
		});

	$scope.submitForm = function(servico){
		var categoriaId = servico.categoria;
		console.log(servico.categoria);
		servico.categoria = categorias[categoriaId-1];

		console.log(servico.categoria);
		var send = angular.toJson(servico);

		
		//send.categoria = categorias.data[servico.categoria];
		//console.log(categorias.data[servico.categoria]);
		//console.log(send.categoria);
		$scope.servico = {};
		console.log(send);
		$http({
			data: send,
			method: "post",
			url: path+"/servico/save/",
			
	   		headers: {
	   			'Content-Type': 'application/json',
	   			"authorization": 'Bearer ' + $cookies.get("access_token"),
	   			},
		//responseType: "json",
		 //crossDomain: true,

		}).then(function(data){
			$scope.retorno = data;
			console.log(data);
			window.location.href = "/";
		});
		//console.log(servico);/
	};
	
}]);

var servicoID;
app.controller('detalharServico',['$location', '$scope','$http',  '$cookies', function listar($location, $scope, $http,  $cookies){
	servicoID = $location.search().servicoID;
	console.log(servicoID)
	$scope.servicoID = servicoID;
	console.log(servicoID);
	$http({
		method: "get",

		url: path+"servicos/"+servicoID,
		responseType: "json",
		headers:{
			//'Access-Control-Allow-Headers': 'Authentication',
			"authorization": 'Bearer ' + $cookies.get("access_token"),
		},
		crossDomain: true,
		

	}).then(function(data){
		$scope.servico = data.data;
		console.log(data)
	});
	
}]);