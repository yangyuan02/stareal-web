'use strict';

stareal
    .controller("CouponController", function ($scope, $stateParams, $lazyLoader, $api, $alert, $state) {
        $scope.mypage = 6;
        $scope.a = 1;
        $scope.pageCount = 1;
        $scope.page_size = 10;
        $scope.sort = 0;
        //获取优惠券列表
        var refresh = function (data) {
            $api.get("app/coupon/list/retrieve",{
                status:data,
                pageNum:1,
                pageSize: $scope.page_size
            },true)
                .then(function (ret) {
                    $scope.coupons = ret.data;
                    if (ret.total_row % ret.page_size == 0)
                        $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                    else
                        $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                    $scope.currentPage = ret.page_num;
                })
        }
        refresh(0)//初始化
        //过滤未使用/已使用
        $scope.filter = function (sort,a) {
            $scope.a = a;
            refresh(sort)
            $scope.sort =sort
        }
        //添加active
        $scope.isActive = function (s) {
            return s== $scope.a;
        }

        //翻页事件
        $scope.onPageChange = function (data) {
            $api.get("app/coupon/list/retrieve", {status:data,
                pageNum: $scope.currentPage,
                pageSize: $scope.page_size
            }, true).then(function (ret) {
                $scope.coupons = ret.data;
                if (ret.total_row % ret.page_size == 0)
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                else
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                $scope.currentPage = ret.page_num;
            });
        };
        $scope.acf = false;
        //添加优惠券
        $scope.addCoupon = function () {
            $api.get("app/coupon/create", {couponNo: $scope.couponNo}, true)
                .then(function (ret) {
                    $alert.show("添加成功！");
                    window.location.reload();
                }, function (err) {
                    $alert.show(err);
                    $scope.acf = false;
                    $scope.couponNo = '';
                });
        }
    });