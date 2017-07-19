'use strict';

stareal
    .controller("PasswordlController", function ($rootScope,$scope, $interval,$stateParams, $lazyLoader, $api, $alert, $state,localStorageService) {
        $scope.mypage = 7;
        $scope.paracont = "获取验证码";
        $scope.accessToken = "";
        $scope.code = "";
        $scope.password = "";
        var second = 60;
        var timerHandler = undefined;
        //获取验证码
        $scope.sendCode = function () {
            // 获取验证码
            $api.get("app/login/code/retrieve", {mobile: $rootScope.tel, type: "0"})
                .then(function (ret) {
                    if (ret.retCode == "0") {
                        $alert.show("验证码已发送!");
                        localStorageService.set('pas_code_token', ret.accessToken);
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
        //修改密码
        $scope.EditPassWord = function () {
            if (!localStorageService.get('pas_code_token')) {
                $alert.show("请先获取验证码！");
                return false;
            }
            if (!$scope.password) {
                $alert.show("密码不能为空！");
                return false;
            }
            if($scope.password!=$scope.confirmP){
                $alert.show("两次输入的密码不一样");
                return false;
            }
            var _params = {
                mobile: $rootScope.tel,
                code: $scope.code,
                password:$scope.password,
                smsToken: localStorageService.get('pas_code_token')
            };
            $api.post("app/login/user/change",_params,true)
                .then(function (ret) {
                    $alert.show("修改成功")
                    $interval.cancel(timerHandler);
                    $scope.paracont = "获取验证码";
                },function (err) {
                    $alert.show(err)
                })
        }
    });