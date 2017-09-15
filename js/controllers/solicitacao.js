angular.module("MyApp").controller('solicitacaoController',['$scope','$http', '$cookies', '$location', '$routeParams', function listar($scope, $http, $cookies, $location, $routeParams){
	prestador = $routeParams.prestadorID;
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

angular.module("MyApp").controller('listarSolicitacoesController',['$scope','$http', '$cookies', '$location', '$routeParams', function listar($scope, $http, $cookies, $location, $routeParams){
	$http({
		url: path+"solicitacoes/all",
		method: 'get',
		headers: {
   			"authorization": 'Bearer ' + $cookies.get("access_token"),
   			'Content-Type': 'application/json'
   		},
	}).then(function(data){
		$scope.solicitacoes = data.data
		console.log(data)
	});

	$http({
			url: path+"orcamentos/all",
			method: 'get',
			headers: {
	   			"authorization": 'Bearer ' + $cookies.get("access_token"),
	   			'Content-Type': 'application/json'
	   		},
		}).then(function(data){
			$scope.orcamentos = data.data
			console.log(data)
		});
}]);

angular.module("MyApp").controller('detalharSolicitacoesController',['$scope','$http', '$cookies', '$location', '$routeParams','$mdToast', function listar($scope, $http, $cookies, $location, $routeParams, $mdToast){
	lerNotificacao = function(solicitacaoId){
	$http({
		method: "get",
		url: path+"notificacoes/ler/"+solicitacaoId,
		
   		headers: {
   			"authorization": 'Bearer ' + $cookies.get("access_token"),
   			'Content-Type': 'application/json'
   		},

	}).then(function(data){
		console.log(data)
		//window.location.href = "/Servico/detalhar.html#/?servicoID="+servicoID
	});

}

	$http({
		url: path+"servicos/solicitacoes/"+$routeParams.solicitacaoID,
		method: 'get',
		headers: {
   			"authorization": 'Bearer ' + $cookies.get("access_token"),
   			'Content-Type': 'application/json'
   		},
	}).then(function(data){
		$scope.solicitacao = data.data
		console.log(data)
	});

	$scope.toogleSelected = function(id){
		console.log(id)
    	$scope.solicitacao.servico[id].selected=!$scope.solicitacao.servico[id].selected;
    	$scope.show =  true
    }
    $scope.ids = {servicos: []};
	$scope.enviarOrcamento = function(orcamento){
		lerNotificacao($scope.solicitacao.id);
		orcamento.solicitacao = $scope.solicitacao.id;
		orcamento.servicos_atendidos = $scope.ids.servicos;

		$http({
			url: path+"servicos/orcamento/criar",
			method: 'post',
			data:orcamento,
			headers: {
	   			"authorization": 'Bearer ' + $cookies.get("access_token"),
	   			'Content-Type': 'application/json'
	   		},
		}).then(function(data){
			$scope.orcamento = data.data
			console.log(data)
			$mdToast.show(
		    	$mdToast.simple()
		        .textContent('Orçamento enviado')
		        .hideDelay(3000)
		    );
		});
	}

	$scope.negarSolicitacao = function(){
		$scope.solicitacao.status="negada"

		$http({
			url: path+"servicos/solicitacoes/atualizar",
			data: $scope.solicitacao,
			method: 'post',
			headers: {
	   			"authorization": 'Bearer ' + $cookies.get("access_token"),
	   			'Content-Type': 'application/json'
	   		},
		}).then(function(data){
			console.log(data)
			$mdToast.show(
		    	$mdToast.simple()
		        .textContent('Solicitação negada')
		        .hideDelay(3000)
		    );
		});
	}
}]);

