'use strict';

stareal
    .controller("OrderController", function ($scope, $stateParams, $lazyLoader, $api, $alert, $state) {
        $scope.mypage = 1;
        $scope.orderId = $stateParams.id;
        $api.get("app/order/detail/retrieve", {orderId: $stateParams.id}, true)
            .then(function (ret) {
                $scope.order = ret.data;
                $scope.param = {};
                $scope.param.deliverType = $scope.order.deliver_type_code;//1快递2现场3上门
                $scope.orderId = ret.data.order_id;
                if($scope.order.state=='已完成'){
                    $scope.defstyle = {
                        "background-position": "0px 0px"
                    }
                    $scope.wzstate ='交易成功';
                }
                if($scope.order.state=='已取消'){
                    $scope.defstyle = {
                        "background-position": "0px -100px"
                    }
                    $scope.wzstate ='交易取消';
                }
                if($scope.order.state=='已支付'){
                    $scope.defstyle = {
                        "background-position": "0px -50px"
                    }
                    $scope.wzstate ='待发货'
                }
                if($scope.order.state=='未支付'){
                    $scope.defstyle = {
                        "background-position": "0px -50px"
                    }
                    $scope.wzstate ='未支付'
                }
            });
        //跳转详情
        $scope.orderUrl = function (order_id) {
            $state.go('main.detail',{good_id:order_id})
        }

    });