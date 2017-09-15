angular.module("MyApp").controller('searchController',['$scope','$rootScope','$http', '$cookies', function listar($scope, $rootScope, $http, $cookies){
		$scope.submitForm = function(search){
			$http({
				data: search,
				method: "post",
				url: path+"servicos/search/",
				
		   		headers: {
		   			"authorization": 'Bearer ' + $cookies.get("access_token"),
		   			'Content-Type': 'application/json'
		   		},

			}).then(function(data){
				$rootScope.servicos= data.data;
				console.log(data)
				window.location.href = "/#/search/listar"
			});
		}
}]);