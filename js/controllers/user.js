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

angular.module("MyApp").controller('searchResultsController',['$scope', '$rootScope','$http', '$location', '$cookies', function getLogado($scope, $rootScope, $http, $location, $cookies){
	//$scope.usuarios = $rootScope.usuarios
	console.log($rootScope.usuarios)
}]);

angular.module("MyApp").controller('detalharUsuario',['$scope','$http', '$routeParams', '$location', '$cookies', '$mdToast', function detalhar($scope, $http, $routeParams, $location, $cookies, $mdToast){
	$scope.show = false
	$http({
		method: "GET",
		url: path+"usuarios/"+$routeParams.prestadorID,
   		headers: {
   			"authorization": 'Bearer ' + $cookies.get("access_token"),
   			'Content-Type': 'application/json'
   		},
		

	}).then(function(data){
		$scope.usuario = data;
		console.log(data)
	})

	$http({
		method: "GET",
		url: path+"servicos/prestador/"+$routeParams.prestadorID,
   		headers: {
   			"authorization": 'Bearer ' + $cookies.get("access_token"),
   			'Content-Type': 'application/json'
   		},
		

	}).then(function(data){
		$scope.servicos = data.data;
		console.log(data)
	})
		
	$http({
		method: "GET",
		url: path+"usuarios/avaliacoes/"+$routeParams.prestadorID,
   		headers: {
   			"authorization": 'Bearer ' + $cookies.get("access_token"),
   			'Content-Type': 'application/json'
   		},
		

	}).then(function(data){
		$scope.avaliacoes = data.data;
		console.log(data)
	})
	
	$scope.toogleSelected = function(id){
    	$scope.servicos[id].selected=!$scope.servicos[id].selected;
    	$scope.show =  true
    }
    $scope.ids = {servicos: []};
    $scope.submitForm = function(){
    	solicitacao = {}
    	//console.log(solicitacao.hora_inicio)
    	$http({
			url: path+"usuarios/ativo",
			method: 'get',
			headers: {
	   			"authorization": 'Bearer ' + $cookies.get("access_token"),
	   			'Content-Type': 'application/json'
	   		},
		}).success(function(data){
			console.log(data)
			solicitacao.usuario = data.id;
			solicitacao.prestador = $routeParams.prestadorID
			solicitacao.servico = $scope.ids.servicos;

			$http({
				data: solicitacao,
				method: "post",
				url: path+"servicos/solicitacoes/criar/",
				
		   		headers: {
		   			"authorization": 'Bearer ' + $cookies.get("access_token"),
		   			'Content-Type': 'application/json'
		   		},

			}).then(function(data){
				$scope.retorno = data;

				console.log($scope.retorno);
				$mdToast.show(
			    	$mdToast.simple()
			        .textContent('Solicitação enviada!')
			        .hideDelay(3000)
			    );
				//console.log(data)
				//window.location.href = "/Servico/detalhar.html#/?servicoID="+servicoID
			});
		});

    }

}]);