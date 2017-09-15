
angular.module("MyApp").controller('loginController',['$scope','$http', '$location', '$httpParamSerializer', '$cookies', function listar($scope, $http, $location, $httpParamSerializer, $cookies){

		$scope.data = {
	        grant_type:"password", 
	        username: "jefferson.fl123@gmail.com", 
	        password: "qwer1234", 
	        client_id: "vKp9jEm6nfegqxOe5U5f7R8RXTT8XDeOHf12NUqW"
	    };

	    $scope.encoded = btoa("vKp9jEm6nfegqxOe5U5f7R8RXTT8XDeOHf12NUqW:B8DL2O4hyE9bKViMsDp9B9zO2qrg09pjOVhdHjZqCnQBZNWjwpksLW7y46eBdfA4elnRWZnY4HlrDoAZIhbnYW2nwzKKF8N0JspW4d6X9ibQ9S8fahGC1H0GU03hReLA");
	    $scope.login = function() {
	    	console.log("Executado")
		    var req = {
	            method: 'POST',
	            url: path+"o/token/",
	            headers: {
	                "Authorization": "Basic " + $scope.encoded,
	                "Content-type": "application/x-www-form-urlencoded",
	                //'Access-Control-Allow-Origin': '*',
	                //'Access-Control-Allow-Headers': '*',
	                //'Access-Control-Allow-Methods': 'POST',
	    
	            },
	            data: $httpParamSerializer($scope.data)
	        }

	        console.log(req)
	        $http(req).success(function(data){
		        $http.defaults.headers.common.Authorization = 'Bearer ' + data.access_token;
		        var expireDate = new Date();
  				expireDate.setDate(expireDate.getDate() + 1);
	            $cookies.put("access_token", data.access_token);
	            $scope.mensagem = "Logado"
	            
	        }).error(function(data){
	        	$scope.mensagem = "não logado"

	        })


       	}
	
}]);