'use strict';

stareal
    .controller("Help", function ($scope, $stateParams, $api, $state, $alert, localStorageService) {
        //$scope.topic = $stateParams.num;
        $scope.cd = function (topic) {
            $scope.topic = topic;
        };
        $scope.cd($stateParams.num);
        //active
        $scope.isActive = function (s) {
            return s== $scope.topic;
        }
    });