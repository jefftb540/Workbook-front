angular.module("MyApp").controller('categoriaController',['$scope','$http', function listar($scope, $http){
	$http({
		method: "get",
		url: path+"categorias/all/",
		responseType: "json",
		 crossDomain: true,

	}).then(function(data){
		categorias = data.data;
		$scope.categorias = data;
		console.log($scope.categorias);
	});

	$scope.submitForm = function(categoria){
		var send = angular.toJson(categoria);
		console.log(send);
		$http({
		data: send,
		method: "post",
		url: path+"/categoria/criar/",
		
   		headers: {'Content-Type': 'application/json'},
		//responseType: "json",
		 //crossDomain: true,

		}).then(function(data){
			$scope.retorno = data;
			console.log(data)
			window.location.href = "listar.html"
		});
		
	};
}]);