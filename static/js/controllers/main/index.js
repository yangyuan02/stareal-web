'use strict';

stareal
    .controller("IndexController", function ($scope, $api, $stateParams, $alert, $document, localStorageService, $state, $interval,$timeout) {
        //获取导航
        $api.get("app/main/category/list")
            .then(function (ret) {
                var nav = ret.data
                var removeArray = nav.splice(0,1);
                $scope.navs = nav
            });
        // 广告轮播
        $api.get("app/main/index/retrieve/")
            .then(function (ret) {
                $scope.advs = ret.data.webAdv;
                console.log($scope.advs)
                if(ret.data.webBanner[0]){
                    $scope.webBanner =ret.data.webBanner[0].thumb;
                    $scope.webBannerId = ret.data.webBanner[0].id;
                }
                var MrLeft = $(".Indextop > .content").offset().left;
                $(".banner .unslider-arrow04.prev").css("left",MrLeft);
                $(".banner .unslider-arrow04.next").css("right",MrLeft)
                $timeout(function(){
                    $(document).ready(function(e) {
                        var h = $('#b04').find("img").height()
                        var unslider04 = $('#b04').unslider({
                                speed: 500,               // 动画的滚动速度，数字越大越慢
                                delay: 3000,              //  每个滑块的停留时间
                                dots: true,
                                fluid:true
                            }),
                            data04 = unslider04.data('unslider');

                        $('.unslider-arrow04').click(function() {
                            var fn = this.className.split(' ')[1];
                            data04[fn]();
                        });
                    });
                },0)
            });
        //热门推荐
        $api.get("app/main/latest/good")
            .then(function (ret) {
                $scope.latest = ret.data;
                // console.log($scope.latest)
            },function (err) {
                $alert.show(err)
            })
        //折扣票
        $api.get("app/list/discount",{direct:'desc',page_num:1,page_size:10})
            .then(function (ret) {
                $scope.discount = ret.data;
            },function (err) {
                $alert.show(err)
            })
        //各种分类
        function getCategory(kind) {
            $api.get("app/search/list/index",{
                kind: kind,
                sort:'hot',
                direct:'desc',
                keyword:'',
                page_num: 1,
                page_size:10
            }).then(function (ret) {
                // $scope.data+"+kind+" = ret.data
                if(kind==0){$scope.performance=ret.data};
                if(kind==1){
                    //话剧歌剧
                    $scope.firstDranma = ret.data[0];
                    $scope.drama=ret.data.slice(1);
                };
                if(kind==2){
                    $scope.sports=ret.data;
                };
                if(kind==3){
                    //展览体育
                    $scope.exhibition=ret.data;
                };
                if(kind==4){$scope.campaign=ret.data};
                if(kind==8){
                    //音乐舞蹈
                    $scope.firstMusic = ret.data[0];
                    $scope.music=ret.data.slice(1)
                };
                if(kind==5){$scope.locale=ret.data};
            });
        }
        getCategory(0) //演唱会
        getCategory(1) //话剧歌剧
        getCategory(2) //体育赛事
        getCategory(3) //展览景点
        getCategory(4) //儿童亲子
        getCategory(8) //音乐舞蹈
        getCategory(5) //曲艺杂谈
        //加载完成执行dom操作
        $scope.$on('latestFinishRender', function () {
            var oDiv=angular.element(".scroll");
            var hot =angular.element(".rebate");
            var oLi=oDiv.find("li");
            var oUl=oDiv.find("ul");
            var prve=hot.find(".btn_l");
            var next=hot.find(".btn_r");
            var Left =1018;
            oUl.css({"width":162*oLi.length+(oLi.length-1)*52});
            var _index = 0;
            var isMoving=true;
            next.click(function () {
                if(isMoving){
                    isMoving=false;
                    _index++
                    if(parseInt(oUl.css("left"))<=-1018){
                        oUl.animate({left:4},1000,function () {
                            isMoving=true;
                        });
                        _index=0
                    }else{
                        oUl.animate({left:-Left*_index-52+4},1000,function () {
                            isMoving=true;
                        });
                    }
                }
            })
            prve.click(function () {
                if(isMoving){
                    isMoving=false;
                    _index--
                    if(parseInt(oUl.css("left"))>=0){
                        oUl.animate({left:-1018-52+4},1000,function () {
                            isMoving=true;
                        });
                        _index = 1
                    }else{
                        oUl.animate({left:-Left*_index+4},1000,function () {
                            isMoving=true;
                        });
                    }
                }
            })
        });

        //签到
        $scope.showInfo = true;
        var myDate  = new Date();
        var Year = myDate.getFullYear();
        var Month = myDate.getMonth()+1;
        var Day = myDate.getDate();
        $scope.nowTime = Year+'年'+Month+'月'+Day+'日';
        $scope.sign = function () {
            if (!localStorageService.get('token')) {
                $(".show-login").click();
                return false
            }
            $api.get("app/member/checkin/create",{},true)
                .then(function (ret) {
                    $scope.GetCheck()
                },function (err) {
                    $alert.show(err)
                })
        }
        //当月签到的情况
        $scope.GetCheck = function () {
            $api.get("app/member/checkin/thismonth",{},true)
                .then(function (ret) {
                    $scope.Sameday = ret.data
                    $scope.days = $scope.Sameday.length //当月共签到天数
                    $scope.Isday = [];  //需不需给默认值
                    for(var i =0;i<$scope.days;i++){
                        $scope.Isday.push($scope.Sameday[i].date.substring(6,8))
                    }

                    //日历函数
                    var d_Date = new Date();
                    var d_y = d_Date.getFullYear();
                    var d_m = d_Date.getMonth()+1;
                    var d_d = d_Date.getDate();
                    if(Number($scope.Isday[0])<Number(d_d)||$scope.Isday[0]==undefined){//和当天比较
                        $scope.showInfo = true;   //没签到
                    }else{
                        $scope.showInfo = false;  //已签到
                    }
                    var a = new Array("日", "一", "二", "三", "四", "五", "六");
                    var week = d_Date.getDay();
                    $scope.weekday = "星期"+ a[week];
                    var fDrawCal = function (y,m) {
                        var temp_d  = new Date(y,m-1,1);//2016,12,28
                        var first_d = temp_d.getDay(); //返回本月1号是星期几
                        temp_d  = new Date(y, m, 0);
                        var all_d   = temp_d.getDate();//返回本月共有多少天,同时避免复杂的判断润年不润年
                        var html,i_d;
                        html="<table><tr>"
                        html+="<td class='td_xq'>日</td>";
                        html+="<td class='td_xq'>一</td>";
                        html+="<td class='td_xq'>二</td>";
                        html+="<td class='td_xq'>三</td>";
                        html+="<td class='td_xq'>四</td>";
                        html+="<td class='td_xq'>五</td>";
                        html+="<td class='td_xq'>六</td></tr>";
                        html+="<tr>";
                        for(var i=1;i<=42;i++){
                            if(first_d<i&&i<=(all_d+first_d)){
                                i_d=i-first_d;//显示出几号
                                for(var j = 0; j<$scope.Isday.length;j++){
                                    if(Number(i_d)==Number($scope.Isday[j])){
                                        html+="<td class='td_hao active1'";//签到后
                                    }
                                }
                                html+="<td class='td_hao'";
                                if (y==d_y&&m==d_m&&d_d==i_d){//日历中为当天
                                    if($scope.showInfo){
                                        html+=" id='now'>"+i_d+"</td>";
                                    }else{
                                        html+=" id='now1'>"+i_d+"</td>";
                                    }
                                }else{
                                    html+=">"+i_d+"</td>";
                                }
                            }else{
                                html+="<td>&nbsp;</td>";
                            }
                            if(i%7==0&&i<42){
                                html+="</tr><tr>";
                            }
                        }
                        html+="</tr></table>";
                        document.getElementById("scs_rl").innerHTML=html;
                    }
                    fDrawCal(d_y,d_m);

                })
        }
        $scope.GetCheck()

        var rs = localStorageService.get('rs');
        if (rs) {
            localStorageService.remove('rs');
            var _state = rs.substring(0, rs.indexOf('-'));
            var _param = rs.substring(rs.indexOf('-') + 1, rs.length);
            $state.go(_state, eval('(' + _param + ')'));
            return;
        }

        $scope.show = function () {
            $scope.menu_show = true;
        }

        $scope.hide = function () {
            $scope.menu_show = false;
        }
        //固定导航栏
        $(window).scroll(function(){
            // var home = angular.element("#home")
                //滚动方法
                var _top = $(window).scrollTop();  //获取滚动的距离
                if(_top>=500){
                    $("#home .white_nav").fadeIn();
                    $("#carousel-demo .home-bg").fadeOut()
                    $("#home .white_nav").addClass("gd");
                }else{
                    $("#home .white_nav").fadeOut()
                    $("#carousel-demo .home-bg").fadeIn()
                    $("#home .white_nav").removeClass("gd");
                }
        })
        //弹窗
        //弹窗
        var height = $(window).height();
        $("#mask").css("height", height);
        $(".show-login").click(function () {
            $("#mask").show();
            $("#content").addClass("coverAniamtion");
        });
        //登录
        $scope.paracont = "获取验证码";
        $scope.telphone_no = "";
        $scope.accessToken = "";
        $scope.code = "";
        var second = 60;
        var timerHandler = undefined;
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
        //退出登录
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
        //大图动画
        $timeout(function () {
            $(".Indexcont .public .l_good .frist_good").hover(function () {
                $(this).find(".frist_wx").css({"display":"block"})
                $(this).find(".frist_wx").animate({bottom:"0px"},200)
            },function () {
                $(this).find(".frist_wx").animate({bottom:"-100px"},200,function () {
                    $(this).find(".frist_wx").css({"display":"none"})
                })
            })
        },0)
        //按钮动画
        $(".more_btn").hover(function () {
            $(this).find("a").animate({top:"40px"},200);
            $(this).find("span").animate({top:"10px"},200);
        },function () {
            $(this).find("a").animate({top:"0px"},200);
            $(this).find("span").animate({top:"-40px"},200)
        })
        //more箭头动画
        $(".opern-title p").hover(function () {
            $(this).find("i").animate({right:"0px"},200);
        },function () {
            $(this).find("i").animate({right:"10px"},200);
        })
    });