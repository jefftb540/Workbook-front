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
	
	
	$scope.submitForm = function(orcamento){
		
		orcamento.solicitacao = $location.search().solicitacao;
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