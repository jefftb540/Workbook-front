angular.module("MyApp").controller('categoriaController',['$scope','$http', '$cookies', function listar($scope, $http, $cookies){
	$http({
		method: "get",
		url: path+"categorias/all/",
		responseType: "json",
		 crossDomain: true,
		 headers:{
		 	'Content-Type': 'application/json',
	   		"authorization": 'Bearer ' + $cookies.get("access_token"),
		 },

	}).then(function(data){
		$scope.categorias = data.data;
		
		console.log($scope.categorias);
	});

	$scope.submitForm = function(categoria){
		var send = angular.toJson(categoria);
		console.log(send);
		$http({
		data: send,
		method: "post",
		url: path+"/categoria/criar/",
		
   		headers: {
   			'Content-Type': 'application/json'
   	},
		//responseType: "json",
		 //crossDomain: true,

		}).then(function(data){
			$scope.retorno = data;
			console.log(data)
			window.location.href = "listar.html"
		});
		
	};
}]);