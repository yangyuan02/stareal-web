'use strict';

stareal
    .controller("OrdersController", function ($scope,$api, $state,$alert) {
        $scope.mypage = 1;
        $scope.a = 1
        $scope.pageCount = 1;
        $scope.page_size = 10;
        $scope.sort = ''

        //初始数据
        var refresh = function (data) {
            $api.get("app/order/list/retrieve", {status:data,
                pageNum: 1,
                pageSize: $scope.page_size
            }, true).then(function (ret) {
                $scope.orders = ret.data;
                if($scope.orders.length==0){
                    $scope.show = true;
                }else{
                    $scope.show = false;
                }
                if (ret.total_row % ret.page_size == 0)
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                else
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                $scope.currentPage = ret.page_num;
            });
        }
        refresh()//初始化
        //过滤全部/待支付/待发货/已发货/已完成
        $scope.filter = function (sort,a) {
            $scope.a = a;
            refresh(sort);
            $scope.sort =sort
        }
        //添加active
        $scope.isActive = function (s) {
            return s== $scope.a;
        }
        //翻页事件
        $scope.onPageChange = function (data) {
            $api.get("app/order/list/retrieve", {status:data,
                pageNum: $scope.currentPage,
                pageSize: $scope.page_size
            }, true).then(function (ret) {
                $scope.orders = ret.data;
                if (ret.total_row % ret.page_size == 0)
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                else
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                $scope.currentPage = ret.page_num;
            });
        };

        $scope.detail = function (order_id) {
            $api.get("app/order/detail/retrieve", {orderId: order_id}, true)
                .then(function (ret) {
                    var state = ret.data.state;
                    var orderId = ret.data.order_id;

                    if (state == '未支付') {
                        $state.go('main.pay_store', {order_id: orderId});
                    } else {
                        $state.go('my.order', {id: orderId});
                    }
                });
        };

        $scope.orderUrl = function (order_id) {
            $api.get("app/order/detail/retrieve",{orderId:order_id},true)
                .then(function (ret) {
                    var goodId=ret.data.good_id;
                    $state.go('main.detail',{good_id:goodId})
                })
        }
        $scope.alertmodel = function (order_id) {
            var height = $(window).height();
            $("."+order_id).css("height", height);
            $("."+order_id).fadeIn();
        }
        //取消订单
        $scope.cancelOrder = function (order_id) {
            $api.post("app/order/cancel", {orderId:order_id}, true)
                .then(function (ret) {
                    $alert.show('订单已取消')
                    setTimeout(function () {
                        refresh()
                    },300)
                }, function (err) {
                    $alert.show(err)
                });
        };
        //删除订单
        $scope.deleteOrder = function (order_id) {
            $api.post("app/order/delete",{orderId:order_id},true)
                .then(function (ret) {
                    $alert.show('删除成功')
                    setTimeout(function () {
                        refresh()
                    },300)
                },function (err) {
                    $alert.show(err)
                })
        }
    });