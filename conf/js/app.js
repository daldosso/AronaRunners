var app = angular.module('app', ['ui.bootstrap', 'ngQuickDate']);

var url = 'api/configurazioni.php';

app.factory('configurationFactory', function ($http) {
    return {
        getConfiguration: function () {
            return $http.get(url);
        },
        updateConfiguration: function (configuration) {
            return $http.post(url, configuration);
        }
    };
});

app.factory('notificationFactory', function () {
    return {
        success: function () {
            alert('Dato salvato');
        },
        error: function (text) {
            alert('Errore!!!');
        }
    };
});

app.controller('ConfigurationCtrl', function ($scope, configurationFactory, notificationFactory) { 
    $scope.configuration = []; 

    var getConfigurationSuccessCallback = function (data, status) { 
        $scope.configuration = data; 
    }; 

    var successCallback = function (data, status, headers, config) { 
        notificationFactory.success(); 
        return configurationFactory.getConfiguration().success(getConfigurationSuccessCallback).error(errorCallback); 
    }; 

    var successPostCallback = function (data, status, headers, config) { 
        successCallback(data, status, headers, config).success(function () { 
            $scope.toggleAddMode(); 
            $scope.person = {}; 
        }); 
    }; 

    var errorCallback = function (data, status, headers, config) { 
        notificationFactory.error(data.ExceptionMessage); 
    }; 

    configurationFactory.getConfiguration().success(getConfigurationSuccessCallback).error(errorCallback); 

    $scope.addConfiguration = function () { 
        configurationFactory.addConfiguration($scope.configuration).success(successPostCallback).error(errorCallback); 
    }; 

    $scope.updateConfiguration = function (configuration) { 
        configurationFactory.updateConfiguration(configuration).success(successCallback).error(errorCallback); 
    }; 
}); 


app.controller('Lookups', function ($scope, $http, $dialog) { 
  
  var reload = function() {
    $http.get('api/grades.php').success(function(data) {
      $scope.grades = data;
    });

    $http.get('api/nations.php').success(function(data) {
      $scope.nations = data;
    });

    $http.get('api/provincie.php').success(function(data) {
      $scope.provincie = data;
    });
  };
  
  $scope.closeAddMode = function () {
    $scope.addModeGrade = false;
    $scope.addModeNation = false;
    $scope.addModeProvincia = false;
    $scope.object = {};
  };
  
  $scope.closeAddMode();
  reload();
  
  $scope.toggleAddModeGrade = function () {
      $scope.addModeGrade = !$scope.addModeGrade;
      $scope.object = {};
  };
  
  $scope.toggleAddModeNation = function () {
      $scope.addModeNation = !$scope.addModeNation;
      $scope.object = {};
  };

  $scope.toggleAddModeProvincia = function () {
      $scope.addModeProvincia = !$scope.addModeProvincia;
      $scope.object = {};
  };
  
  $scope.object = {};
  $scope.addObject = function (type) {
    $http.post('api/' + type + '-add.php', {desc: $scope.object.description}).then(function() {
      $scope.closeAddMode();
      reload();
    });
  };
  
  
  $scope.deleteObject = function(object, type) {
    
    $scope.message = {
      title:    "Elimina",
      body:  "Confermi eliminazione?"
    };

    $scope.opts = {
      dialogFade: true,
      backdropFade: true,
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      resolve: {
          message: function () {
            return $scope.message;
          },
          num: function () {
            return $scope.num;
          }
        },
      templateUrl:  'template/dialog_template.html',
      controller: 'DialogController',
      dialogClass: 'modal alert'
    };   
    
    var d = $dialog.dialog($scope.opts);
    d.open().then(function(result) {
      if (result.response === 'yes') {
        $http.post("api/" + type + "-delete.php", {code: object.id})
          .success(function() {
          }).error(function() {
            $scope.message.title = 'Errore';
          $dialog.dialog($scope.opts).open().then();
        }).then(function() {
          reload();
        });    
      }
    });
    
  };
});

app.controller('FootRacesCtrl', function($scope, $http, $modal, $log) {
  
  var reload = function() {

    $http.get('http://www.podisticaarona.it/mobile/svr/footraces-list.php').success(function(data) {
      $scope.races = data;
    });

  };

  reload();

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

  $scope.open = function () {

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
                  $modalInstance.dismiss('cancel');
                  $http.post("http://www.podisticaarona.it/mobile/svr/footraces-crud.php", params)
                    .success(function() {})
                    .error(function() {})
                    .then(function() {
                      reload();
                  });
              };

              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
              };
          },
          resolve: {
              race: function () {
                  return $scope.race;
              }
          }
      });
   };

});


function DialogCtrl($scope, $dialog, $http){
  
  var initScope = function() {
    $scope.message = {
      title:    "Invio email",
      body:  "Conferma invio email \"riepilogo iscrizioni\" a tutte le palestre?      Totale palestre: "
    };

    $scope.opts = {
      dialogFade: true,
      backdropFade: true,
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      resolve: {
          message: function () {
            return $scope.message;
          },
          num: function () {
            return $scope.num;
          }
        },
      templateUrl:  'template/dialog_template.html',
      controller: 'DialogController'
    };
  };
  
  initScope();

  $scope.openDialog = function(num){
    $scope.num = num;
    var d = $dialog.dialog($scope.opts);
    d.open().then(function(result){
      if (result.response === 'yes') {
        $scope.opts.templateUrl = 'alert_template.html';        
        $http.post("api/send-emails.php", {})
          .success(function() {
            $scope.message.title = 'Email inviate';
            $dialog.dialog($scope.opts).open().then(initScope());
        }).error(function() {
            $scope.message.title = 'Errore';
            $dialog.dialog($scope.opts).open().then(initScope());
        });    
      }
    });
  };
  
}

// the dialog is injected in the specified controller
function DialogController($scope, $http, dialog, message, num){
  $scope.message = message;
  $scope.num = num;

  $scope.close = function(result) {
    dialog.close(result);
  };
  
  $scope.yes = function(){
    dialog.close({response: 'yes'});
  };
  
  $scope.no = function(){
    dialog.close({response: 'no'});
  };
}

app.controller("DemoCtrl", function($scope) {
  $scope.myDate = null
  $scope.setToToday = function() { $scope.myDate = new Date(); }
});

