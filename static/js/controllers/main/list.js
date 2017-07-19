'use strict';

stareal
    .controller("ListController", function ($scope, $api, $stateParams, $state, $lazyLoader) {

        $scope.kind = $stateParams.kind;
        $scope.sort = $stateParams.sort;
        $scope.direct = $stateParams.direct;
        $scope.isHot = ($scope.sort == 'hot');
        $scope.keyword = $stateParams.keyword;
        $scope.sf = false;

        $scope.isActiveNav = function (s) {
            var s1 =s-1
            return s1== $stateParams.kind;
        }
        // set pagecount in $scope
        $scope.pageCount = 1;
        $scope.page_size = 10;
        // 加载对应演出种类的内容
        // $scope.goods = new $lazyLoader("app/search/list/index", {
        //     kind: ($scope.kind == 'all' ? '' : $scope.kind),
        //     sort: $scope.sort,
        //     direct: $scope.direct,
        //     keyword: $scope.keyword
        // });

        $api.get("app/search/list/index", {
            kind: ($scope.kind == 'all' ? '' : $scope.kind),
            sort: $scope.sort,
            direct: $scope.direct,
            keyword: $scope.keyword,
            page_num: 1,
            page_size: $scope.page_size
        }).then(function (ret) {
            $scope.goods = ret.data;
            //暂无内容
            if($scope.goods.length == 0){
                $scope.show = true
            }else {
                $scope.show = false
            }
            if (ret.total_row % ret.page_size == 0)
                $scope.pageCount = parseInt(ret.total_row / ret.page_size);
            else
                $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
            $scope.currentPage = ret.page_num;
        });

        var refresh = function () {
            $state.go('main.list', {
                kind: $scope.kind,
                sort: $scope.sort,
                direct: $scope.direct,
                keyword: $scope.keyword
            });
        };

        // 热度/时间排序过滤
        $scope.filter = function (sort, direct) {
            $scope.sort = sort;
            $scope.direct = direct;
            $scope.isHot = ($scope.sort == 'hot');
            refresh();
        }

        $scope.onPageChange = function () {
            // ajax request to load data

            $api.get("app/search/list/index", {
                kind: ($scope.kind == 'all' ? '' : $scope.kind),
                sort: $scope.sort,
                direct: $scope.direct,
                keyword: $scope.keyword,
                page_num: $scope.currentPage,
                page_size: $scope.page_size
            }).then(function (ret) {
                window.scrollTo(0,0);
                $scope.goods = ret.data;
                if (ret.total_row % ret.page_size == 0)
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                else
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                $scope.currentPage = ret.page_num;
            });
        };


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