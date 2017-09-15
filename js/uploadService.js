'use strict';

app.factory('uploadService',
    ['$http',
     function ($http) {

      var urlBase = path;
      var uploadService = {};

uploadService.postServico = function (newVehicleDataObject) {
          return $http.post(urlBase + 'vehicles/createNewVehicle.php', JSON.stringify(newVehicleDataObject));
      }; 

        //file upload service
      uploadService.uploadFileToUrl = function(file){
           var fd = new FormData();
           fd.append('file', file);
           console.log (file);

           $http.post(urlBase + 'vehicles/uploadFile2.php', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            })
                  .success(function(){})
                  .error(function(){});
            }

      return vehiclesService;

  }]);