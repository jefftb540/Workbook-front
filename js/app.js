var app = angular.module('MyApp', ['naif.base64','ngRoute','ngCookies',"checklist-model", 'ngMaterial','ngMessages','md.time.picker']);
var categorias;
var path = "http://localhost:8000/"


angular.module("MyApp").config(["$routeProvider", "$httpProvider", "$mdThemingProvider", function($routeProvider, $httpProvider, $mdThemingProvider){
	$mdThemingProvider.theme('default')
    	.primaryPalette('orange')
    	.accentPalette('grey');

	$routeProvider
		.when("/",{
			templateUrl: "main.html"
		})
		.when("/login",{
			templateUrl: "login.html",
			controller: "loginController"
		})
		.when("/servico/criar",{
			templateUrl: "servico/form.html",
			controller: "servicoController"
		})


		.when("/servico/listar",{
			templateUrl: "servico/listar.html",
			controller: "listarServicos"
		})

		.when("/servico/atualizar/:servicoID",{
			templateUrl: "servico/form.html",
			controller: "detalharServico"
		})

		.when("/servico/deletar/:servicoID",{
			templateUrl: "servico/detalhar.html",
			controller: "deletarServico"
		})

		.when("/prestador/:prestadorID",{
			templateUrl: "usuario/detalhar.html",
			controller: "detalharUsuario",
		})

		.when("/prestador/:prestadorID/:servicoID",{
			templateUrl: "usuario/detalharPesquisa.html",
			controller: "detalharUsuarioPesquisa",
		})

		.when("/orcamento/solicitar/:prestadorID",{
			templateUrl: "orcamento/solicitar.html",
			controller: "solicitacaoController"
		})

		.when("/orcamento/solicitar/chat/:orcamentoID",{
			templateUrl: "solicitacao/chat.html",
			controller: "mensagemController"
		})

		.when("/orcamento/chat/:orcamentoID",{
			templateUrl: "solicitacao/chat.html",
			controller: "mensagemController"
		})

		.when("/solicitacoes/",{
			templateUrl: "solicitacao/listar.html",
			controller: "listarSolicitacoesController"
		})

		.when("/solicitacoes/:solicitacaoID",{
			templateUrl: "solicitacao/detalhar.html",
			controller: "detalharSolicitacoesController"
		})

		.when("/search/listar",{
			templateUrl: "usuario/listar.html",
			controller: "searchResultsController"
		})


		
	}]);


angular.module("MyApp").directive('scroll', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      scope.$watchCollection(attr.scroll, function(newVal) {
        $timeout(function() {
         element[0].scrollTop = element[0].scrollHeight;
        });
      });
    }
  }
});