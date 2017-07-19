'use strict';

stareal
    .controller("RankController", function ($scope, $stateParams, $api, $state, $alert, localStorageService) {
        $scope.mypage = 2;
        $scope.beilypage = 2;
        $scope.pageCount = 1;
        $scope.page_size = 10;

        $api.get("app/belly/getRank",{
            pageNum:1,
            pageSize:$scope.page_size},true)
            .then(function (ret) {
                $scope.ranks = ret.data;
                if (ret.total_row % ret.page_size == 0){
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                }else{
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                }
                $scope.currentPage = ret.page_num;
            })

        //分页事件
        $scope.onPageChange = function () {
            $api.get("app/belly/getRank",{
                pageNum: $scope.currentPage,
                pageSize: $scope.page_size,
            },true)
                .then(function (ret) {
                    $scope.ranks = ret.data;
                    if (ret.total_row % ret.page_size == 0){
                        $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                    }else{
                        $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                    }
                    $scope.currentPage = ret.page_num;
                })
        }
    });