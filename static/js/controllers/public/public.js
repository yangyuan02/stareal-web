'use strict';

stareal
    .controller("PublicController", function ($scope, $api, $stateParams, $alert, $document, localStorageService, $state, $interval) {

        // ---------------------------------------演出分类public/hot.html
        $api.get("app/search/list/index", {
            sort: 'weight',
            direct: 'desc',
            page_num: 1,
            page_size: 10
        }).then(function (ret) {
            $scope.hots = ret.data;
        });

        // ---------------------------------------演出分类public/nav.html
        //获取导航
        $api.get("app/main/category/list")
            .then(function (ret) {
                var nav = ret.data
                var removeArray = nav.splice(0,1);
                $scope.navs = nav
            });


        $scope.show = function () {
            $scope.menu_show = true;
        }

        $scope.hide = function () {
            $scope.menu_show = false;
        }

        //弹窗
        $scope.loginModa = function () {
            var height = angular.element(window).height();
            angular.element("#mask").css("height", height);
            angular.element("#mask").show();
            angular.element("#content").addClass("coverAniamtion");
        };
        $scope.$on('to-child', function() {
            $scope.loginModa()		 //子级能得到值
        });
        // ---------------------------------------public/login.html
        $scope.paracont = "获取验证码";
        $scope.telphone_no = "";
        $scope.accessToken = "";
        $scope.code = "";
        var second = 60;
        var timerHandler = undefined;
        $scope.cancel = function () {
            $("#myModal").modal("hide");
        }
        $scope.sendCode = function () {
            if (!validatemobile($scope.telphone_no)) {
                return;
            }
            // 演出分类
            $api.get("app/login/code/retrieve", {mobile: $scope.telphone_no, type: "0"})
                .then(function (ret) {
                    if (ret.retCode == "0") {
                        $alert.show("验证码已发送!");
                        localStorageService.set('code_token', ret.accessToken);
                    } else {
                        $alert.show("验证码发送失败，请稍后重试!");
                    }
                });

            if (timerHandler) {
                return;
            }
            timerHandler = $interval(function () {
                if (second <= 0) {
                    $interval.cancel(timerHandler);
                    timerHandler = undefined;
                    second = 60;
                    $scope.paracont = "重发验证码";
                } else {
                    $scope.paracont = second + "秒";
                    second--;

                }
            }, 1000, 100)
        };

        $scope.login = function () {
            if (!validatemobile($scope.telphone_no)) {
                return;
            }

            if (!localStorageService.get('code_token')) {
                $alert.show("请先获取验证码！");
            }

            var _params = {
                mobile: $scope.telphone_no,
                code: $scope.code,
                accessToken: localStorageService.get('code_token')
            };

            $api.post("app/login/user/retrieve", _params)
                .then(function (ret) {
                    $scope.accessToken = ret.accessToken;
                    location.href = "oauth/web?accessToken=" + ret.accessToken + "&mobile=" + $scope.telphone_no + "&state=" + $stateParams.good_id;
                }, function (err) {
                    $alert.show(err);
                });
        }
        $scope.logout = function () {
            localStorageService.set('token', null);
            window.location.reload();
        }
        function validatemobile(mobile) {
            if (mobile.length == 0) {
                $alert.show('请输入手机号码！');
                return false;
            }
            if (mobile.length != 11) {
                $alert.show('请输入11位手机号码！');
                return false;
            }

            var myreg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,2,3,5-9]))\d{8}$/;
            if (!myreg.test(mobile)) {
                $alert.show('请输入有效的手机号码！');
                return false;
            }

            return true;
        }

        // ---------------------------------------查找public/clearfix.html
        $scope.search = function () {
            //var re = str.replace(/\s+/g,"");//删除所有空格;
            $state.go('main.list', {kind: "all", sort: "hot", direct: "desc", keyword: $scope.keyword.replace(/\s+/g,"")});
        };
        //回车搜索
        $scope.searchenter1=function(event) {
            var event = event || window.event;
            var val = document.getElementById("js_search_val").value;
            if (event.keyCode == 13){
                if(val == ''){
                    return false;
                }else{
                    $scope.search();
                }
            }
        }
        //模糊搜索
        $scope.arr=[];
        $scope.search_show = false;
        $scope.change = function (data) {
            var val = document.getElementById("js_search_val").value;
            if(val==''||val==null||val==undefined){
                $scope.search_show = false;
            }
            if(val.length>=1){
                $scope.keyword = data.replace(/\s+/g,"");
                $scope.search_show = true;
                $api.get("app/search/list/index",{keyword:$scope.keyword},true)
                    .then(function (ret) {
                        $scope.arr=ret.data;
                    })
            }
        }
    });
