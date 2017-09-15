angular.module("MyApp").controller('servicoController',['$scope','$http', '$cookies', function listar($scope, $http, $cookies){
	
	$http({
		method: "get",
		url: path+"servicos/all",
		responseType: "json",
		 crossDomain: true,
		 headers:{
		 	'Content-Type': 'application/json',
	   		"authorization": 'Bearer ' + $cookies.get("access_token"),
		 },
	}).then(function(data){
		$scope.servicos = data;
		console.log(data)
	});


	$scope.submitForm = function(servico){
		$http({
			method: "get",
			url: path+"usuarios/ativo",
			 headers:{
			 	'Content-Type': 'application/json',
		   		"authorization": 'Bearer ' + $cookies.get("access_token"),
			 },
		}).success(function(data){
			
			servico.usuario = data.id
			console.log(data)
			servico.imagem = "data:jpeg;base64,"+servico.imagem.base64
			console.log(servico)
			$http({
				data: servico,
				method: "post",
				url: path+"servicos/save/",
				
		   		headers: {
		   			'Content-Type': 'application/json',
		   			"authorization": 'Bearer ' + $cookies.get("access_token"),
		   			},
			//responseType: "json",
			 //crossDomain: true,

			}).then(function(data){
				$scope.retorno = data;
				console.log(data);
			});
		//console.log(servico);/
		});
	};
	
}]);

var servicoID;
var original = {}
app.controller('detalharServico',['$location', '$scope','$http','$q',  '$cookies', '$routeParams', function listar($location, $scope, $http,$q,  $cookies, $routeParams){
	servicoID = $routeParams.servicoID;
	console.log(servicoID)
	$scope.servicoID = servicoID;
	console.log(servicoID);
	
	var promisse =	$http({
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
		angular.copy($scope.servico, original)
		console.debug($scope.servico)
		return $http({
			method: "get",

			url: path+"servicos/avaliacoes/"+$scope.servico.usuario.id,
			responseType: "json",
			headers:{
				"authorization": 'Bearer ' + $cookies.get("access_token"),
			},
			crossDomain: true,
			

		})
		}).then(function(data2){
			$scope.avaliacoes = data2.data;
			console.log(data2);
		});

		function findDiff(original, edited){
	        var diff = {}
	        for(var key in original){
	            if(original[key] !== edited[key])
	                diff[key] = edited[key];
	        }
	        return diff;
	    }

		$scope.submitForm = function(servico){
			console.log(original)
			console.log(servico)
			servico2 = findDiff(original, servico)
			servico2.id = servico.id
			/*servico2.categoria = servico2.categoria.id*/
			//servico2.usuario.email = "abc@abc.com"
			console.log(servico2)
			//servico.usuario = servico.usuario.id
			servico.id = $routeParams.servicoID
			$http({
				data: servico2,
				method: "post",
				url: path+"servicos/update/",
				
		   		headers: {
		   			'Content-Type': 'application/json',
		   			"authorization": 'Bearer ' + $cookies.get("access_token"),
		   			},
			//responseType: "json",
			 //crossDomain: true,

			}).then(function(data){
				$scope.retorno = data;
				console.log(data);
			});
		}
			
}]);

app.controller('deletarServico',['$location', '$scope','$http','$q',  '$cookies', '$routeParams', function listar($location, $scope, $http,$q,  $cookies, $routeParams){
	
	var promisse =	$http({
		method: "get",
		url: path+"servicos/delete/"+$routeParams.servicoID,
		headers:{
			//'Access-Control-Allow-Headers': 'Authentication',
			"authorization": 'Bearer ' + $cookies.get("access_token"),
		},
	}).then(function(data){
		console.log(data)
	});
}]);

app.controller('listarServicos',['$location', '$scope','$http','$cookies', function listar($location, $scope, $http, $cookies){
	
	$http({
		method: "get",
		url: path+"servicos/all",
		headers:{
			//'Access-Control-Allow-Headers': 'Authentication',
			"authorization": 'Bearer ' + $cookies.get("access_token"),
		},
	}).then(function(data){
		console.log(data)
		$scope.servicos = data.data
	});
}]);