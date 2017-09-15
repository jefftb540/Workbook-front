angular.module("MyApp").controller('orcamentoController',['$scope','$http', '$cookies', '$location', function listar($scope, $http, $cookies, $location){
	var servicos;
	$http({
		url: path+"servicos/solicitacoes/"+$location.search().solicitacao,
		
   		headers: {
   			"authorization": 'Bearer ' + $cookies.get("access_token"),
   			'Content-Type': 'application/json'
   		},

	}).then(function(data){
		$scope.solicitacao = data.data;
		console.log($scope.solicitacao)
		//window.location.href = "/Servico/detalhar.html#/?servicoID="+servicoID
	});
	
	$scope.ids={servicos:[]}
	$scope.submitForm = function(orcamento){
		
		orcamento.solicitacao = $location.search().solicitacao;
		orcamento.servicos_atendidos = $scope.ids.servicos;
		console.log(orcamento);
		$http({
				data: orcamento,
				method: "post",
				url: path+"servicos/orcamento/criar/",
				
		   		headers: {
		   			"authorization": 'Bearer ' + $cookies.get("access_token"),
		   			'Content-Type': 'application/json'
		   		},

			}).then(function(data){
				$scope.retorno = data;
				//console.log(data)
				//window.location.href = "/Servico/detalhar.html#/?servicoID="+servicoID
			});

	}
}]);

angular.module("MyApp").controller('confirmarOrcamentoController',['$scope','$http', '$cookies', '$location', function listar($scope, $http, $cookies, $location){
	var servicos;
	$http({
		url: path+"orcamentos/"+$location.search().orcamento,
		
   		headers: {
   			"authorization": 'Bearer ' + $cookies.get("access_token"),
   			'Content-Type': 'application/json'
   		},

	}).then(function(data){
		$scope.orcamento = data.data;
		console.log($scope.orcamento)
		//window.location.href = "/Servico/detalhar.html#/?servicoID="+servicoID
	});

	$scope.atualizar = function(status){
		$scope.orcamento.status = status
		console.log($scope.orcamento)
		$http({
			data: $scope.orcamento,
			method: "post",
			url: path+"servicos/orcamento/atualizar/",
			
	   		headers: {
	   			"authorization": 'Bearer ' + $cookies.get("access_token"),
	   			'Content-Type': 'application/json'
	   		},

		}).then(function(data){
			$scope.retorno = data;
			//console.log(data)
		});

	}
}]);	