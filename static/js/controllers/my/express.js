'use strict';

stareal
    .controller("ExpController", function ($scope, $stateParams, $api, $state, $alert, localStorageService) {
        $scope.mypage = 1;
        $scope.orderId = $stateParams.id;
        //物流信息
        $api.get("app/order/shunfeng/retrieve",{orderId:$scope.orderId},true)
            .then(function (ret) {
                console.log(ret)
                $scope.showExpress = true;
                $scope.express = ret.data;
            },function (err) {
                // $alert.show(err)
            })
    });