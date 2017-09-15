var app = angular.module('MyApp', ['ngRoute','ngCookies',"checklist-model", 'ngMaterial']);
var categorias;
var path = "http://localhost:8000/"


angular.module("MyApp").config(["$routeProvider", function($routeProvider){
	$routeProvider
		.when("/",{
			templateUrl: "main.html"
		})
		.when("/servico/:servicoID",{
			templateUrl: "servico/detalhar.html",
			controller: "detalharServico",
		})

		.when("/orcamento/solicitar/:prestadorID",{
			templateUrl: "orcamento/solicitar.html",
			controller: "solicitacaoController"
		})

		.when("/solicitacoes/",{
			templateUrl: "solicitacao/listar.html",
			controller: "listarSolicitacoesController"
		})
	}]);