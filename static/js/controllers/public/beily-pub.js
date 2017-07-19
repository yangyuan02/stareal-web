'use strict';

stareal
    .controller("PubBeilyController", function ($scope,$compile,$stateParams, $api, $state, $alert, localStorageService) {
        // //获取我的贝里
        $api.get("app/belly/retrieve",{},true)
            .then(function (ret) {
                $scope.data = ret.data;
                $scope.bellyremain = $scope.data.l3ft;//贝里余额
            })
        //充值贝里
        var height = $(window).height();
        $("#beily-model").css("height", height);
        $("#beily-pay").click(function () {
            $("#beily-model").show();
            $("#beily-box").addClass("coverAniamtion");
        });
        $("#close").click(function () {
            $("#mask").hide();
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
        var reg = /^\+?[1-9][0-9]*$/;  //正整数
        $scope.show_b = true;
        $scope.PayBeily = function (price,a) {
            var intPr = parseInt(price);
            if(!reg.test(intPr)){
                $alert.show('请输入正整数');
                return false
            }
            if(intPr<5){
                $alert.show('最少5元');
                return false
            }
            if(intPr>50){
                $alert.show('最多50元');
                return false
            }
            if(a==1){//支付宝
                $api.post("app/belly/order/create",{total:intPr},true)
                    .then(function (ret) {
                        $api.post("app/pay/gateway/create",{orderId:ret.data.orderId,tradeType:2,payType:5,},true)
                            .then(function (ret) {
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
                            },function (err) {
                                $alert.show(err)
                            })
                    },function (err) {
                        $alert.show(err)
                    })
            }
            if(a==2){//微信
                $scope.show_b = !$scope.show_b;
                $api.post("app/belly/order/create",{total:intPr},true)
                    .then(function (ret) {
                        $api.post("app/pay/gateway/create",{orderId:ret.data.orderId,tradeType:2,payType:1,},true)
                            .then(function (ret) {
                                $scope.qrCode = ret.data.qrCode;
                            },function (err) {
                                $alert.show(err)
                            })
                    },function (err) {
                        $alert.show(err)
                    })
            }
        }

        //弹窗关闭
        $scope.close = function () {
            $scope.show_b = true;
            $scope.beily = '';
            $scope.a = 1;
        }
        angular.element("html,body").click(function () {
            $scope.close()
        })

    });