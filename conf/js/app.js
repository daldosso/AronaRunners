var app = angular.module('app', ['ui.bootstrap', 'ngQuickDate']);

app.controller('FootRacesCtrl', function($scope, $http, $modal, $log) {

  var reload = function() {
    $http.get('http://www.podisticaarona.it/mobile/svr/footraces-list.php?conf=yes').success(function(data) {
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
      id: '',
      when: '',
      where: '',
      length: '',
      length2: '',
      length3: '',
      organizer: '',
      web: '',
      type: ''
  };

  var stringToDate = function(str) {
    var day = str.substr(0, 2);
    var month = str.substr(3, 2);
    var year = str.substr(6, 4);
    var hour = str.substr(11, 2);
    var minutes = str.substr(14, 2);
    return new Date(year, month, day, hour, minutes);
  }

  $scope.open = function(race) {

      $modal.open({
          templateUrl: 'race.html',
          backdrop: true,
          windowClass: 'modal',
          controller: function ($scope, $modalInstance, $log, $http) {
              $scope.race = race;  
              $scope.submit = function () {
                  var params = {};
                  params.race = race;
                  if (!params.race.id) {
                    params.op = "C";
                    params.race.when = new Date(params.race.when.valueOf() - params.race.when.getTimezoneOffset() * 60000);
                  } else {
                    //params.race.when = stringToDate(params.race.when);
                    params.race.when.setHours(params.race.when.getHours() + 1);
                    params.op = "U";
                  }                  
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