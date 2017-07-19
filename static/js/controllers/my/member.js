'use strict';

stareal
    .controller("MemberController", function ($scope, $stateParams, $api, $state, $alert, localStorageService) {
        $scope.mypage = 3;
        //个人信息接口
        $api.get("app/login/userinfo/retrieve",{}, true) //接口有问题
            .then(function (ret) {
                $scope.person = ret.data;
            });
        //我的会员
        //获取会员信息
        $scope.GetMember = function () {
            $api.get("app/member/index/retrieve",{},true)
                .then(function (ret) {
                    $scope.member = ret.data;
                    $scope.level = $scope.member.level;
                    $scope.isCoupon = $scope.member.coupon_flag;//是否可以领取会员专属优惠券
                    $scope.value = $scope.member.value;
                    if($scope.level==1){
                        $scope.Grade = '普通'
                        $scope.UpGrade = '白银';
                        $scope.bar = 190/1000*$scope.value;
                    }
                    if($scope.level==2){
                        $scope.Grade = '白银'
                        $scope.UpGrade = '黄金';
                        $scope.bar = 410/3000*$scope.value;
                    }
                    if($scope.level==3){
                        $scope.Grade = '黄金'
                        $scope.UpGrade = '铂金';
                        $scope.bar = 670/6000*$scope.value;
                    }
                    if($scope.level==4){
                        $scope.Grade = '铂金'
                        $scope.UpGrade = '钻石';
                        $scope.bar = 1000/15000*$scope.value;
                    }
                    if($scope.level==5){
                        $scope.Grade = '钻石'
                        $scope.UpGrade = '钻石';
                        $scope.maxlevele = true;
                        $scope.bar = 1000;
                    }
                    if($scope.isCoupon){
                        $scope.gbs = {background:'#ed3b3b '} //领取过
                        $scope.gbn = '可领取'
                    }else{
                        $scope.gbs = {background:'#cfcfcf '} //领取过
                        $scope.gbn = '已领取'
                    }
                })
        }
        $scope.GetMember()
        //领取优惠券
        $scope.GetCoupon = function () {
            $api.get("app/member/coupon/retrieve",{},true)
                .then(function (ret) {
                    $scope.GetMember()
                    $alert.show('已领取')
                },function (err) {
                    $alert.show(err)
                })
        }
    });