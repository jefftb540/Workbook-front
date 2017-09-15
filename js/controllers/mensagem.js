angular.module("MyApp").controller('mensagemController',['$scope','$http', '$cookies', '$routeParams', function listar($scope, $http, $cookies,$routeParams ){
	loadMessages = function(){
		$http({
			url: path+"usuarios/ativo",
			method: 'get',
			headers: {
	   			"authorization": 'Bearer ' + $cookies.get("access_token"),
	   			'Content-Type': 'application/json'
	   		},
		}).success(function(data){
			console.log(data)
			$scope.usuario_logado= data.id;
			console.log($scope.usuario_logado)
		});
		$http({
			url: path+"servicos/solicitacoes/mensagens/"+$routeParams.orcamentoID,
					
	   		headers: {
	   			"authorization": 'Bearer ' + $cookies.get("access_token"),
	   			'Content-Type': 'application/json'
	   		},

		}).then(function(data){
			$scope.mensagens = data.data;
			console.log($scope.mensagens)
			console.log($scope.mensagens[0].solicitacao.usuario)
			//console.log(data)
			//window.location.href = "/Servico/detalhar.html#/?servicoID="+servicoID
		});
	}
	loadMessages();
	$scope.submitMessage = function(msg){
		
		msg.usuario = $scope.usuario_logado
		//msg.solicitacao = $scope.mensagens[0].solicitacao
		msg.solicitacao = $routeParams.orcamentoID
		console.log(msg)
		$http({
				data: msg,
				method: "post",
				url: path+"servicos/solicitacoes/mensagens/criar/",
				
		   		headers: {
		   			"authorization": 'Bearer ' + $cookies.get("access_token"),
		   			'Content-Type': 'application/json'
		   		},

			}).then(function(data){
				$scope.retorno = data;
				$scope.msg = "";
				loadMessages();
				//console.log(data)
				//window.location.href = "/Servico/detalhar.html#/?servicoID="+servicoID
			});
	}
}]);