angular.module("MyApp").controller('solicitacaoController',['$scope','$http', '$cookies', '$location', function listar($scope, $http, $cookies, $location){
	prestador = $location.search().prestador;
	$http({
		url:path+"servicos/prestador/"+prestador,
		headers: {
		   			"authorization": 'Bearer ' + $cookies.get("access_token"),
		   			'Content-Type': 'application/json'
		   		},

	}).success(function(data){
		$scope.servicos = data;
		console.log(data);
	});

	$scope.solicitacao = {}
	$scope.ids = {servicos: []};


	$scope.submitForm = function(solicitacao){
		//solicitacao.usuario = $location.search().usuario;
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
				//console.log(data)
				//window.location.href = "/Servico/detalhar.html#/?servicoID="+servicoID
			});
		});
	}
}]);