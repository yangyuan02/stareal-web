'use strict';

stareal
    .controller("PayStoreController", function ($scope, $stateParams, $api, $state, $alert,$interval, localStorageService,base64) {

        $scope.order_id = $stateParams.order_id;
        // 获取订单详情
        $api.get("app/order/detail/retrieve", {orderId: $scope.order_id}, true)
            .then(function (ret) {
                var order = ret.data;
                $scope.order = order;
                $scope.param = {};
                $scope.param.deliverType = $scope.order.deliver_type_code;//1快递2现场3上门
                //商品过期
                $scope.create_time = $scope.order.create_time;
                var expiredTime =  $scope.create_time *1000+15*60*1000;//过期时间戳
                var nowDate =  Date.parse(new Date());//现在时间戳
                $scope.date = expiredTime-nowDate;
                var timer = $interval(function () {
                    $scope.date -= 1000;
                    if($scope.date<=0){
                        $interval.cancel(timer);
                        $alert.show('商品已过期');
                        $state.go('main.pay_succee', {order_id: $scope.order_id});
                    }
                },1000)
            }, function (err) {
                $alert.show(err);
                $state.go('main.pay_succee', {order_id: $scope.order_id});
            });
        /**
         * 支付订单
         * 支付宝支付
         */
        $scope.a = 1;
        $scope.checkPay = function (a) {
            $scope.a = a;
        }
        //添加active
        $scope.isActive = function (s) {
            return s== $scope.a;
        }
        $scope.pay = function (a) {
            if(a==1){//支付宝
                // var tempwindow=window.open('','_blank');
                $api.post("app/pay/gateway/create",{
                    orderId:$scope.order_id,
                    tradeType: 0,
                    payType: 5
                },true)
                    .then(function (ret) {
                        // tempwindow.location='https://excashier.alipay.com/standard/auth.htm?payOrderId=3a820beca8d748d29d1291b220fa9927.60';
                        document.forms['alipaysubmit']._input_charset.value = ret.data._input_charset;
                        document.forms['alipaysubmit'].subject.value = ret.data.subject;
                        // document.forms['alipaysubmit'].it_b_pay.value = ret.data.it_b_pay;
                        document.forms['alipaysubmit'].sign.value = ret.data.sign;
                        document.forms['alipaysubmit'].notify_url.value = ret.data.notify_url;
                        document.forms['alipaysubmit'].body.value = ret.data.body;
                        document.forms['alipaysubmit'].payment_type.value = ret.data.payment_type;
                        document.forms['alipaysubmit'].out_trade_no.value = ret.data.out_trade_no;
                        document.forms['alipaysubmit'].partner.value = ret.data.partner;
                        document.forms['alipaysubmit'].service.value = ret.data.service;
                        document.forms['alipaysubmit'].total_fee.value = ret.data.total_fee;
                        document.forms['alipaysubmit'].return_url.value = ret.data.return_url;
                        document.forms['alipaysubmit'].sign_type.value = ret.data.sign_type;
                        document.forms['alipaysubmit'].seller_id.value = ret.data.seller_id;
                        document.forms['alipaysubmit'].show_url.value = ret.data.show_url;
                        document.forms['alipaysubmit'].submit();
                    }, function (err) {
                        $alert.show(err);
                        $state.go('main.index');
                    });
            }
            if(a==2){
                //弹窗
                var height = $(window).height();
                $("#mask-pay").css("height", height);
                $("#mask-pay").show();
                $("#mask-pay #pay-content").addClass("coverAniamtion");
                $api.post("app/pay/gateway/create",{
                    orderId:$scope.order_id,
                    tradeType: 0,
                    payType: 1},true)
                    .then(function (ret) {
                        $scope.qrCode = ret.data.qrCode;
                        var timer = $interval(function () {
                            $api.get("app/order/detail/retrieve",{orderId:$scope.order_id},true)
                                .then(function (ret) {
                                    if(ret.data.pay_state=='已支付'){
                                        $interval.cancel(timer);
                                        $state.go('main.pay_succee', {order_id: $scope.order_id});
                                    }
                                })
                        },2000)
                    },function (err) {
                        $alert.show(err);
                        $state.go('main.index');
                    })
            }
        }
    })