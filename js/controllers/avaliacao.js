angular.module("MyApp").controller('avaliacaoController',['$scope','$http', '$location', '$cookies', function listar($scope, $http, $location, $cookies){
	servicoID = $location.search().prestadorID;
	var usuarioID = sessionStorage.getItem("usuario");
	$http({

		method: "get",
		url: path+"servicos/avaliacoes/"+servicoID,
		responseType: "json",
		 crossDomain: true,
		 headers:{"authorization": 'Bearer ' + $cookies.get("access_token"),}

		}).then(function(data){
			$scope.avaliacoes = data.data;
			console.log($scope.avaliacoes);
			
		});
		/*$scope.facebookUser = JSON.parse(window.sessionStorage.getItem("facebookUser"));
		$http({
			url: "http://localhost:8080/usuario/getID/"+$scope.facebookUser.id,
			method: 'get'
		}).then(function(data){
			user = data.data;
			sessionStorage.setItem("usuario", user.id);
		});	*/
		
		/*
		var servico;
		var usuario;
		var amigos = [];
		$http({
			url: path+"servicos/"+servicoID,
			method: 'get'
		}).then(function(data){
			servico = data.data;
			console.log(servico);
		});*/

		/*FB.init({
	  		appId      : '1249138875131378',
	  		xfbml      : true,
	  		version    : 'v2.7',
	  		oauth:true
		});*/

		var avaliacoesAmigos = [];
		var amigosID = [];
		var cont = 0;
		/*FB.getLoginStatus(function(response) {
			FB.api("me/friends", function(data){
		    	amigos = data.data;
		    	//console.log(amigos);

		    	for (var i = 0; i < amigos.length; i++) {
					amigosID[i] = amigos[i].id;
				};

				console.log(amigosID);

				for (var i = 0; i < $scope.avaliacoes.length; i++) {
					//if($scope.avaliacoes[.usuario.indexOf(amigos[i]))
					console.log($scope.avaliacoes[i]);

					if(amigosID.indexOf($scope.avaliacoes[i].usuario.facebookID) >=0){
						//alert ("funcionou");
						avaliacoesAmigos[cont] = $scope.avaliacoes[i];
						$scope.avaliacoes[i] = null;
						cont++;
					}
				};
				$scope.$apply(function(){$scope.avaliacoesAmigos = avaliacoesAmigos;});
				
				console.log($scope.avaliacoes);
			});
		});*/
		$scope.submitForm = function(avaliacao){
			var usuario;
			avaliacao.prestador = $location.search().prestadorID;
			avaliacao.nota = $('#star-rating').val()
			$http({
				url: path+"usuarios/ativo",
				method: 'get',
				headers: {
	   			"authorization": 'Bearer ' + $cookies.get("access_token"),
	   			'Content-Type': 'application/json'
	   		},
			}).then(function(data){
				avaliacao.avaliador = data.data.id;		
			$http({
					data: avaliacao,
					method: "post",
					url: path+"servicos/avaliacoes/criar/",
					
			   		headers: {
			   			"authorization": 'Bearer ' + $cookies.get("access_token"),
			   			'Content-Type': 'application/json'
			   		},

				}).then(function(data){
					$scope.retorno = data;
				});
					
			});
			
	};
}]);