'use strict';

stareal
    .controller("ReceiveController", function ($scope, $stateParams, $lazyLoader, $api, $alert, $state) {
        $scope.mypage=5;
        $scope.pageCount = 1;
        $scope.page_size = 10;
        $api.get("app/comment/retrieve",{pageNum:1,pageSize:$scope.page_size},true)
            .then(function (ret) {
                $scope.comments = ret.data;
                if (ret.total_row % ret.page_size == 0){
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                }else{
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                }
                $scope.currentPage = ret.page_num;
            })

        //分页事件
        $scope.onPageChange = function () {
            $api.get("app/comment/retrieve",{
                pageNum: $scope.currentPage,
                pageSize: $scope.page_size,
            },true)
                .then(function (ret) {
                    $scope.comments = ret.data;
                    if (ret.total_row % ret.page_size == 0){
                        $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                    }else{
                        $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                    }
                    $scope.currentPage = ret.page_num;
                })
        }

    });