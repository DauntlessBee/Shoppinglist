'use strict';
angular.module('ShoppingList.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  }
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [{
    title: 'Reggae',
    id: 1
  }, {
    title: 'Chill',
    id: 2
  }, {
    title: 'Dubstep',
    id: 3
  }, {
    title: 'Indie',
    id: 4
  }, {
    title: 'Rap',
    id: 5
  }, {
    title: 'Cowbell',
    id: 6
  }];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {})

.controller('ItemCtrl', function($scope, $ionicPopup, $stateParams, storage) {
  $scope.items = [];
  var listId = $stateParams.id;
  var listItems = storage.get('items');
  
  if (listItems){
    listItems = listItems.filter(function (item) {
      return item.listId == listId;
    })
    $scope.items = listItems;
  }

  $scope.remItem =function(index) {
    $scope.items.splice(index,1)
    storage.set('items', $scope.items);
  };

  $scope.showPopup = function() {
    $scope.data = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.name">',
      title: 'Enter name for item',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.name) {
            //don't allow the user to close unless he enters name password
            e.preventDefault();
          } else {
            return $scope.data.name;
          }
        }
      }, ]
    });
    myPopup.then(function(res) {
      $scope.items.push({
        id: $scope.items.length,
        listId: listId,
        name: res
      })
      storage.set ('items', $scope.items);
    });
  };

  console.log(listId);

})

.controller('ShoppingListsCtrl', function($scope, $ionicPopup, storage) {
  $scope.lists = [];
  var currentList = storage.get('list');
  //console.log(currentList);
  if (currentList) {
    $scope.lists = currentList;  
  };

  // Triggered on a button click, or some other target
  $scope.showPopup = function() {
    $scope.data = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.name">',
      title: 'Enter name for list',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.name) {
            //don't allow the user to close unless he enters name password
            e.preventDefault();
          } else {
            return $scope.data.name;
          }
        }
      }, ]
    });
    myPopup.then(function(res) {
      $scope.lists.push({
        id: new Date().getTime(),
        name: res
      })
      storage.set('list', $scope.lists);
    });
  };
});