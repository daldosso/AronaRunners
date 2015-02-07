var app = angular.module('app', ['ui.bootstrap', 'ngQuickDate']);

app.controller('FootRacesCtrl', function($scope, $http, $modal, $log) {

  var reload = function() {
    $http.get('http://www.podisticaarona.it/mobile/svr/footraces-list.php').success(function(data) {
      $scope.races = data;
    });
  };
  reload();

  var showError = function(message) {
    $modal.open({
          templateUrl: 'error.html',
          backdrop: true,
          windowClass: 'modal',
          controller: function ($scope, $modalInstance) {
            $scope.message = message;
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };  
          },
          resolve: {
              message: function() {
                return message
              }
          }
    });
  };

  $scope.race = {
      when: '',
      where: '',
      length: '',
      length2: '',
      length3: '',
      organizer: '',
      web: '',
      type: ''
  };

  $scope.open = function(race) {

      $modal.open({
          templateUrl: 'race.html',
          backdrop: true,
          windowClass: 'modal',
          controller: function ($scope, $modalInstance, $log, $http, race) {
              $scope.race = race;
              $scope.submit = function () {
                  var params = {};
                  params.op = "C";
                  params.race = race;
                  params.race.when = new Date(params.race.when.valueOf() - params.race.when.getTimezoneOffset() * 60000);                  
                  $modalInstance.dismiss('cancel');
                  $http.post("http://www.podisticaarona.it/mobile/svr/footraces-crud.php", params)
                    .success(function(response) {
                      if (response.success == "false") {
                        showError(response.message);  
                      }                      
                    })
                    .error(function() {
                        showError("Errore generico");    
                    })
                    .then(function() {
                      reload();
                  });
              };

              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
                  reload();
              };
          },
          resolve: {
              race: function () {
                  return $scope.race;
              }
          }
      });
   };

  var confirmDelete = function(callback) {
    $modal.open({
          templateUrl: 'confirm.html',
          backdrop: true,
          windowClass: 'modal',
          controller: function ($scope, $modalInstance) {
            $scope.message = "Confermi l'eliminazione della gara?";
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
            $scope.ok = function () {
              $modalInstance.dismiss('cancel');
              callback();
            };  
          },
          resolve: {
              message: function() {
                return $scope.message;
              }
          }
    });
  };

   $scope.delete = function(id) {
      confirmDelete(function() {
        var params = {};
        params.op = "D";
        params.race = {};
        params.race.id = id;
        $http.post("http://www.podisticaarona.it/mobile/svr/footraces-crud.php", params)
          .success(function(response) {
            if (response.success == "false") {
              showError(response.message);  
            }                      
          })
          .error(function() {
              showError("Errore generico");    
          })
          .then(function() {
            reload();
        });
      });       
   };

});