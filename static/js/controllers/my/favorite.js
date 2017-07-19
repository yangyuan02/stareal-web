'use strict';

stareal
    .controller("FavoriteController", function ($scope, $api, $state,$alert) {
        $scope.mypage = 4;
        $scope.pageCount = 1;
        $scope.page_size = 10;
        //初始化数据
        $scope.GetFavor = function () {
            $api.get("app/favor/list",{
                page_num:1,
                page_size:$scope.page_size,
                direct:'desc'},true)
                .then(function (ret) {
                    $scope.favors = ret.data;
                    // console.log($scope.favors);
                    if (ret.total_row % ret.page_size == 0)
                        $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                    else
                        $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                    $scope.currentPage = ret.page_num;
                })
        }
        $scope.GetFavor()
        //分页事件
        $scope.onPageChange = function () {
            $api.get("app/favor/list",{
                page_num: $scope.currentPage,
                page_size: $scope.page_size,
                direct:'desc'
            },true)
                .then(function (ret) {
                    $scope.favors = ret.data;
                    if (ret.total_row % ret.page_size == 0)
                        $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                    else
                        $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                    $scope.currentPage = ret.page_num;
                })
        }
        //跳转详情
        $scope.orderUrl = function (order_id) {
            $state.go('main.detail',{good_id:order_id})
        }
        //取消关注
        $scope.unFollow =function(good_id){
            $api.post("app/favor/create", {good_id:good_id}, true)
                .then(function (ret) {
                    $alert.show("已取消");
                    $scope.GetFavor()
                    //window.location.reload();
                });
        }

        //演出状态按钮
        $scope.btnSetColor = function (statu) {
            if(statu=='预售中'){
                $scope.defstyle = {
                    "color": "#4899FE",
                    "border":"1px solid #4899FE"
                }
                $scope.btn = '预售中'
            }
            if(statu=='售票中'){
                $scope.defstyle = {
                    "color": "#FF5A5F",
                    "border":"1px solid #FF5A5F"
                }
                $scope.btn = '售票中'
            }
            if(statu=='扫尾票'){
                $scope.defstyle = {
                    "color": "#FF5000",
                    "border":"1px solid #FF5000"
                }
                $scope.btn = '扫尾票'
            }
            if(statu=='即将开票'){
                $scope.defstyle = {
                    "color": "#3D50F0",
                    "border":"1px solid #3D50F0"
                }
                $scope.btn = '预定中'
            }
            if(statu=='演出结束'){
                $scope.defstyle = {
                    "color": "#6B6B6B",
                    "border":"1px solid #6B6B6B"
                }
                $scope.btn = '已结束'
            }
            if(statu=='已售罄'){
                $scope.defstyle = {
                    "color": "#6B6B6B",
                    "border":"1px solid #6B6B6B"
                }
                $scope.btn = '已售罄'
            }
            return $scope.defstyle;
        }
        //演出状态文字
        $scope.btnText = function (statu) {
            if(statu=='预售中'){
                $scope.btn = '预售中'
            }
            if(statu=='售票中'){
                $scope.btn = '售票中'
            }
            if(statu=='扫尾票'){
                $scope.btn = '扫尾票'
            }
            if(statu=='即将开票'){
                $scope.btn = '预定中'
            }
            if(statu=='演出结束'){
                $scope.btn = '已结束'
            }
            if(statu=='已售罄'){
                $scope.btn = '已售罄'
            }
            return $scope.btn;
        }
    });