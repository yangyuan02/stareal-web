'use strict';

stareal
    .controller("PaySucceeController", function ($scope, $stateParams, $api, $state, $alert, localStorageService) {
            $scope.orderId = $stateParams.order_id;
            //获取订单详情
        $api.get("app/order/detail/retrieve", {orderId:$scope.orderId}, true)
            .then(function (ret) {
                $scope.order = ret.data;
                $scope.statu = $scope.order.state;
                if($scope.statu=='已支付'){
                    $scope.showInfo = true;
                }
                $scope.param = {};
                $scope.param.deliverType = $scope.order.deliver_type_code;//1快递2现场3上门
            })
    });