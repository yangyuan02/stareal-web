'use strict';

stareal
    .controller("PersonalController", function ($scope, $http,$stateParams, $lazyLoader, $api, $alert, $state,localStorageService) {
        $scope.mypage = 7;
        $scope.man = false;
        $scope.woman = false;
        //设置性别
        $scope.presonal = {
                getUser: function () {
                    $api.get("app/login/userinfo/retrieve",{},true)
                        .then(function (ret) {
                            //获取现在的时间
                            var yearNow = new Date().getFullYear();//获取年份
                            var monthSel = new Date().getMonth()+1;//获取月份
                            var maxDay = new Date(yearNow,monthSel,0).getDate();//获取当月天数
                            $scope.thumb = {};
                            $scope.thumb.imgSrc = ret.data.headimgurl;
                            $scope.nickname = ret.data.nickname;
                            $scope.mobile = ret.data.mobile;
                            $scope.sex = ret.data.sex;
                            var dateStr = ret.data.birthday;
                            if(dateStr){
                                $scope.year = dateStr.substring(0, 4);
                                $scope.month = dateStr.substring(4, 6);
                                $scope.day = dateStr.substring(6,8);
                                //初始化
                                $scope.time = {
                                    year:Number($scope.year),
                                    month:Number($scope.month),
                                    day:Number($scope.day),
                                }
                            }else{//生日不存在的时候
                                $scope.time = {
                                    year:yearNow,
                                    month:monthSel,
                                    day:maxDay,
                                }
                            }
                            if($scope.sex){
                                if($scope.sex=='男'){
                                    $scope.man =true;
                                    $scope.defstyle = {
                                        "background-position": "0px 0px"
                                    };
                                }
                                if($scope.sex=='女'){
                                    $scope.woman =true;
                                    $scope.defstyle1 = {
                                        "background-position": "0px 0px"
                                    };
                                }
                            }else{
                                $scope.man =true;
                                $scope.defstyle = {
                                    "background-position": "0px 0px"
                                };
                            }
                            $scope.yearNows = [];//年份
                            $scope.monthNow = [];//月份
                            $scope.dayNow = [];//天数
                            for(var i=yearNow;i>1899;i--){
                                $scope.yearNows.push({
                                    id:i,
                                    name:i
                                })
                            }
                            for(var i=1;i<13;i++){
                                $scope.monthNow.push({
                                    id:i,
                                    name:i
                                })
                            }
                            $scope.$watch('time.month',function(newValue){//这个是得监控月份才能获取天数
                                maxDay = newValue?new Date(yearNow,newValue,0).getDate():'';
                                for(var i=1;i<maxDay+1;i++){
                                    $scope.dayNow.push({
                                        id:i,
                                        name:i
                                    })
                                }
                            })
                        })
                },
                setSex1:function () {
                    $scope.defstyle = {
                        "background-position": "0px 0px"
                    };
                    $scope.man = true;
                    $scope.woman =false;
                    if($scope.man){
                        $scope.defstyle1 = {
                            "background-position": "-10px 0px"
                        };
                    }else{
                        $scope.defstyle1 = {
                            "background-position": "-10px 0px"
                        };
                    }
                },
                setSex2:function () {
                    $scope.defstyle1 = {
                        "background-position": "0px 0px"
                    };
                    $scope.man = false;
                    $scope.woman =true;
                    if($scope.woman){
                        $scope.defstyle = {
                            "background-position": "-10px 0px"
                        };
                    }else{
                        $scope.defstyle = {
                            "background-position": "-10px 0px"
                        };
                    }
                },
                save:function () {
                    var year = $scope.time.year.toString();
                    var month = $scope.time.month<10?'0'+$scope.time.month.toString():$scope.time.month.toString();
                    var day = $scope.time.day<10?'0'+$scope.time.day.toString():$scope.time.day.toString();
                    var birthday = year+month+day;
                    var sex = '';
                    if($scope.man){
                        sex = '男'
                    }
                    if($scope.woman){
                        sex = '女'
                    }
                    if($scope.changImg==1){//选择了图片
                        //图片上传
                        var token = localStorageService.get('token')
                        var url = 'https://api.stareal.cn/mobile/app/upload/image?accessToken='+token; //正式
                        // var url = 'http://t.stareal.cn:8080/api/app/upload/image?accessToken='+token;//测试
                        var fd = new FormData();
                        fd.append('image', $scope.file[0]);
                        $http.post(url, fd, {
                            transformRequest: angular.identity,
                            headers: {
                                'Content-Type': undefined
                            }
                        }).success(function (data) {
                            $api.post("app/login/userinfo/update",{
                                nickname:$scope.nickname,
                                sex:sex,
                                birthday:birthday,
                                headimgurl:data.url
                            },true)
                                .then(function (ret) {
                                    $alert.show("修改成功")
                                },function (err) {
                                    $alert.show(err)
                                })
                        },function () {
                            $api.post("app/login/userinfo/update",{
                                nickname:$scope.nickname,
                                sex:sex,
                                birthday:birthday,
                                headimgurl:''
                            },true)
                                .then(function (ret) {
                                    $alert.show("修改成功")
                                },function (err) {
                                    $alert.show(err)
                                })
                        })
                    }else{
                        $api.post("app/login/userinfo/update",{
                            nickname:$scope.nickname,
                            sex:sex,
                            birthday:birthday,
                            headimgurl:''
                        },true)
                            .then(function (ret) {
                                $alert.show("修改成功")
                            },function (err) {
                                $alert.show(err)
                            })
                    }
                }
        }
        $scope.presonal.getUser()
    });