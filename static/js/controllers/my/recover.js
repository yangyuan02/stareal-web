'use strict';

stareal
    .controller("RecoverController", function ($scope, $stateParams, $api, $state, $alert, localStorageService) {
        $scope.mypage = 2;
        $scope.beilypage = 3
        // //获取我的贝里
        $api.get("app/belly/retrieve",{},true)
            .then(function (ret) {
                $scope.data = ret.data;
                $scope.bellyremain = $scope.data.l3ft;//贝里余额
                $scope.isCheck = $scope.data.check_flag;//是否签到过
                $scope.isComment  = $scope.data.comment_flag;//是否评论过
                $scope.invitation_num = $scope.data.invitation_num//邀请朋友注册的次数

                if($scope.isCheck){
                    $scope.gbs = {background:'#cfcfcf '} //领取过
                    $scope.gbn = '已领取'
                }else{
                    $scope.gbs = {background:'#ed3b3b '} //领取过
                    $scope.gbn = '去完成';
                    $scope.GoIndex = function () {
                        $state.go('main.index',{});
                    }
                }

                if($scope.isComment){
                    $scope.gbs1 = {background:'#cfcfcf '} //领取过
                    $scope.gbn1 = '已领取'
                }else{
                    $scope.GoComment = function () {
                        $state.go('main.list', {kind:'all',sort:'hot',direct:'desc'});
                    }
                    $scope.gbs1 = {background:'#ed3b3b '} //领取过
                    $scope.gbn1 = '去完成'
                }

            })
    });