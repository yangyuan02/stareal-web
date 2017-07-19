'use strict';
stareal
    .controller("DetailController", function ($rootScope,$scope,$http,$compile,$interval,$stateParams,$location,$anchorScroll,$api, $sce, base64, $state, $alert, localStorageService,FileUploader) {
        $scope.current = $stateParams.good_id;
        localStorageService.set("img_temp","");
            $scope.GetGood = function () {
                $api.get("app/detail/good/retrieve", {id: $stateParams.good_id},true)
                    .then(function (ret) {
                        var good = ret.data;
                        console.log(ret)
                        good.detail = $sce.trustAsHtml(base64.decode(good.detail));
                        $scope.good = good;
                        $scope.seat = good.seat_thumb;
                        $scope.title = $scope.good.title;
                        $scope.site_title = $scope.good.site_title;
                        $scope.favor = $scope.good.favor;//收藏
                        $scope.thumb = $scope.good.thumb;
                        $scope.seat = good.seat_thumb; //座位图
                        if(!good.star){
                           $scope.showstar = true;
                        }else{
                            var star = good.star.split('.')
                            $scope.star1 = star[0];
                            $scope.star2 = star[1]
                        }
                        if (good.state == '售票中') {
                            $scope.gbs = {background: '#FF2450'};
                            $scope.gbn = '立即购票';
                            $scope.gf = 1;
                        }
                        if (good.state == '预售中') {
                            $scope.gbs = {background: '#FF2450'};
                            $scope.gbn = '立即购票';
                            $scope.gf = 1;
                        }
                        if (good.state == '扫尾票') {
                            $scope.gbs = {background: '#FF2450'};
                            $scope.gbn = '立即购票';
                            $scope.gf = 1;
                        }
                        if (good.state == '即将开票') {
                            var t = function () {
                                if (!localStorageService.get('token')) {
                                    $scope.$broadcast('to-child');
                                    return;
                                }
                                //预约登记
                                var height = $(window).height();
                                $(".subscribe").css("height", height);
                                $(".subscribe-t").fadeIn();
                            }
                            $scope.createOrder = t;
                            if(good.appRegistered==1){
                                $scope.gbs = {background: '#fdcc4b'};
                                $scope.gbn = '已预约';
                                $scope.gf = 4;
                            }else{
                                $scope.gbs = {background: '#fdcc4b'};
                                $scope.gbn = '立即预约';
                                $scope.gf = 0;
                            }
                        }

                        if (good.state == '演出结束') {
                            $scope.gbs = {background: '#E8E8E8'};
                            $scope.gbn = good.state;
                            $scope.gf = 3;
                        }
                        if (good.state == '已售罄') {
                            $scope.gbs = {background: '#E8E8E8'};
                            $scope.gbn = good.state;
                            $scope.gf = 3;
                        }

                    });
            }
            $scope.GetGood();

        //项目评分星星
        $scope.setPost = function (status) {
            var IntStatus = parseInt(status);
            if(IntStatus){
                if(IntStatus>=0&&IntStatus<2){
                    $scope.defstyle = {
                        "background-position": "0px -84px" //一颗心
                    }
                }
                if(IntStatus>=2&&IntStatus<4){
                    $scope.defstyle = {
                        "background-position": "0px -63px" //二颗心
                    }
                }
                if(IntStatus>=4&&IntStatus<6){
                    $scope.defstyle = {
                        "background-position": "0px -42px" //三颗心
                    }
                }
                if(IntStatus>=6&&IntStatus<8){
                    $scope.defstyle = {
                        "background-position": "0px -21px" //四颗心
                    }
                }
                if(IntStatus>=8&&IntStatus<=10){
                    $scope.defstyle = {
                        "background-position": "0px 0px" //五颗心
                    }
                }
            }else{//没有星星
                $scope.defstyle = {
                    "background-position": "0px -106px" //一颗心
                }
            }
            return $scope.defstyle;
        }
        //评论星星
        $scope.setPost1 = function (status) {
            var IntStatus = parseInt(status);
                if(IntStatus==1||IntStatus==2){
                    $scope.defstyle = {
                        "background-position": "0px -84px" //一颗心
                    }
                }
                if(IntStatus==3||IntStatus==4){
                    $scope.defstyle = {
                        "background-position": "0px -63px" //二颗心
                    }
                }
                if(IntStatus==5||IntStatus==6){
                    $scope.defstyle = {
                        "background-position": "0px -42px" //三颗心
                    }
                }
                if(IntStatus==7||IntStatus==8){
                    $scope.defstyle = {
                        "background-position": "0px -21px" //四颗心
                    }
                }
                if(IntStatus==9||IntStatus==10){
                    $scope.defstyle = {
                        "background-position": "0px 0px" //五颗心
                    }
                }
                return $scope.defstyle;
        }
        //巡演开始
        $api.get("app/detail/good/tour", {id: $stateParams.good_id},true)
            .then(function (ret) {
                $scope.tours = ret.data
                if(ret.data.length>1){
                    $scope.showXun = true
                }else{
                    $scope.showXun = false
                }
            })
        //当前加active
        $scope.isActive = function (s) {
            return $scope.current ==s
        }

        //加载完成执行dom操作
        $scope.$on('latestFinishRendertour', function (e,v) {
            var oDiv=angular.element(".xun_adds");
            var hot =angular.element(".xunyan-1");
            var oLi=oDiv.find("li");
            var oUl=oDiv.find("ul");
            var prve=hot.find(".btn_l1");
            var next=hot.find(".btn_r1");
            var Left =756;
            oUl.css({"width":132*oLi.length});
            var _index = 0;
            var isMoving=true;
            if(oLi.length<=6){
                prve.css({"display":"none"});
                next.css({"display":"none"})
            }else{
                next.click(function () {
                    if(isMoving){
                        isMoving=false;
                        _index++
                        if(parseInt(oUl.css("left"))<=-756){
                            oUl.animate({left:0},1000,function () {
                                isMoving=true;
                            });
                            _index=0
                        }else{
                            oUl.animate({left:-Left*_index-36},1000,function () {
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
                            oUl.animate({left:-756-36},1000,function () {
                                isMoving=true;
                            });
                            _index = 1
                        }else{
                            oUl.animate({left:-Left*_index},1000,function () {
                                isMoving=true;
                            });
                        }
                    }
                })
            }
        });

        $scope.telphone_no = $rootScope.tel
        $api.get("app/detail/ticket/retrieve", {id: $stateParams.good_id})
            .then(function (ret) {
                console.log(ret)
                $scope.remark = ret.remark;
                $scope.plans = ret.data;
                $scope.paras = {};
                $scope.max = 6;

                // 获取第一个可以选择的场次
                var getAvailablePlanIndex = function () {
                    return 0;
                };

                // 获取第一个可以选择的价位
                var getAvailableCatIndex = function () {
                    var _index = [null, null];

                    catsLoop:
                        for (var _i = 0; _i < $scope.cats.length; _i++) {
                            var _gory = $scope.cats[_i].children;
                            for (var _j = 0; _j < _gory.length; _j++) {
                                if (_gory[_j].status) {
                                    _index = [_i, _j];
                                    break catsLoop;
                                }
                            }
                        }
                    return _index;
                };

                // 获取第一个可以选择的价格
                var getAvailablePriceIndex = function () {
                    var _index = null;

                    for (var _i = 0; _i < $scope.prices.length; _i++) {
                        if ($scope.prices[_i].status) {
                            _index = _i;
                            break;
                        }
                    }
                    return _index;
                };

                // 更改场次
                var switchPlan = function (index) {
                    if (true) {
                        $scope.paras.planIndex = index;
                        $scope.cats = $scope.plans[index].children;
                        $scope.max = $scope.plans[index].max_num;
                        localStorageService.set('date',$scope.plans[index].name)  //会报错  做一个判断
                        $scope.time=$scope.plans[index].name.replace(/#/g,"");
                        // 联动切换价位
                        var _index = getAvailableCatIndex();
                        $scope.prices = [];
                        switchCat(_index[0], _index[1], true);
                    }
                };

                // 更改价位
                var switchCat = function (index1, index2, choosable) {
                    if(choosable==''){
                        $scope.pop()
                    }

                    if (choosable) {
                        $scope.paras.catIndex1 = index1;
                        $scope.paras.catIndex2 = index2;
                        localStorageService.set('cat',$scope.plans[$scope.paras.planIndex].children[index1].children[index2].name)  //会报错
                        // 没有可选择的价位
                        if (index1 == null) {
                            $scope.prices = [];
                        } else {
                            $scope.prices = $scope.plans[$scope.paras.planIndex].children[index1].children[index2].children;
                        }

                        // 联动切换价格
                        var _index = getAvailablePriceIndex();
                        switchPrice(_index, true)
                    }else {
                        $scope.price2 = $scope.plans[$scope.paras.planIndex].children[index1].children[index2].name;
                        $scope.ticketId=$scope.plans[$scope.paras.planIndex].children[index1].children[index2].id;
                    }
                };

                // 更改价格
                var switchPrice = function (index, choosable) {

                    if (choosable) {
                        $scope.paras.priceIndex = index;
                    }
                };

                // ****************************************  加载计算张数部分  ****************************************
                $scope.num = 1;

                $scope.subNum = function () {
                    if ($scope.num == 1) {
                        $scope.defstyle1={
                            "color":"#ccc"
                        }
                        $scope.defstyle={
                            "color":"#000"
                        }
                        return;
                    }
                    $scope.num = $scope.num - 1;
                    calTotal();
                };

                $scope.addNum = function () {
                    if ($scope.num == $scope.max) {
                        $scope.defstyle={
                            "color":"#ccc"
                        }
                        $alert.show("最多只能购买"+$scope.max+"张!")
                        return;
                    }else{
                        $scope.defstyle={
                            "color":"#000"
                        }
                        $scope.defstyle1={
                            "color":"#000"
                        }
                    }
                    $scope.num = $scope.num + 1;
                    calTotal();
                };

                $scope.$watch("paras", function (newValue) {
                    // 张数还原到1
                    $scope.num = 1;
                    calTotal();
                }, true);

                var calTotal = function () {
                    var _po = $scope.prices[$scope.paras.priceIndex];
                    var _price = (_po ? _po.price : 0);
                    $scope.unit_price = _price
                    $scope.total = _price * $scope.num;
                }
                var createOrder = function (gf) {
                    if (!localStorageService.get('token')) {
                        $scope.$broadcast('to-child');
                        return;
                    }
                    if ($scope.paras.priceIndex == null) {
                        $alert.show("请选择座位!")
                    }
                    var _po = $scope.prices[$scope.paras.priceIndex];
                    var _sku = _po.num;
                    if (_sku < $scope.num) {
                        $alert.show("库存不足!")
                        return false
                    }
                    if(gf==1){
                        localStorageService.set('max',$scope.max)
                        localStorageService.set('unit_price',$scope.unit_price);
                        localStorageService.set('title',$scope.title);
                        localStorageService.set('site_title',$scope.site_title);
                        localStorageService.set('thumb',$scope.thumb);
                        localStorageService.set('seat',_po.name);
                        localStorageService.set('price',_po.price);
                        localStorageService.set('ticketId',_po.id);
                        localStorageService.set('total',$scope.total);
                        localStorageService.set('num',$scope.num);
                        $state.go('main.pay',{order_id:$stateParams.good_id})
                    }
                    // if(gf==0){//预约登记
                    //     var height = $(window).height();
                    //     $(".subscribe").css("height", height);
                    //     $(".subscribe").fadeIn();
                    //     return false
                    // }
                    if(gf==3){
                        $alert.show("演出结束");
                        return false
                    }
                    if(gf==4){
                        $alert.show("您已预约！")
                        return false;
                    }
                }

                // ****************************************  初始化  ****************************************
                $scope.switchPlan = switchPlan;
                $scope.switchCat = switchCat;
                $scope.switchPrice = switchPrice;
                $scope.createOrder = createOrder;
                switchPlan(0);
            },function (err) {
                // var createOrder = function (gf) {
                //     if (!localStorageService.get('token')) {
                //         $scope.$broadcast('to-child');
                //         return;
                //     }
                //     if(gf==4){
                //         $alert.show("您已预约！");
                //         return false;
                //     }
                //     //预约登记
                //     var height = $(window).height();
                //     $(".subscribe").css("height", height);
                //     $(".subscribe").fadeIn();
                // }
                // $scope.createOrder = createOrder;
                // $alert.show(err)
            });
        //预约登记
        $scope .subscribe = function () {
            var myreg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
            if (!myreg.test($scope.telphone_no)) {
                $alert.show('请输入有效的手机号码！');
                return false;
            }
            $api.post("app/register/appointment/create",{good_id: $stateParams.good_id,mobile: $scope.telphone_no},true)
                .then(function (ret) {
                    $alert.show("预约成功");
                    $scope.gbn = '已预约';
                    $scope.gf = 4;
                    $(".subscribe").fadeOut();
                },function (err) {
                    $alert.show(err)
                    $(".subscribe").fadeOut();
                })

        }
        //缺货登记弹窗
        $scope.pop = function () {
            if (!localStorageService.get('token')) {
                $scope.$broadcast('to-child');
                return false;
            }
            var height = $(window).height();
            $(".pop").css("height", height);
            $(".pop").fadeIn();
        }
        $scope.submitPop = function (){
            var myreg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
            if (!myreg.test($scope.telphone_no)) {
                $alert.show('请输入有效的手机号码！');
                return false;
            }
            $api.post("app/register/oos/create",{ticket_id:$scope.ticketId,mobile: $scope.telphone_no},true)
                .then(function (ret) {
                    $(".pop").fadeOut();
                    $alert.show("登记成功！")
                },function (err) {
                    $alert.show(err);
                    $(".pop").fadeOut();
                })
        }    
        //收藏
        $scope.collect = function (GoodId) {
            if (!localStorageService.get('token')) {
                $scope.$broadcast('to-child');
                return false;
            }
            $api.post("app/favor/create",{good_id:GoodId},true)
                .then(function (ret) {
                    if($scope.favor==0){
                        $scope.favor=1;
                    }else{
                        $scope.favor=0;
                    }
                })
        }

        //获取当前演出下评论
        $scope.pageCount = 1;
        $scope.page_size = 10;
        $api.get("app/comment/goodComments",{good_id:$stateParams.good_id,pageNum:1,pageSize:$scope.page_size},true)
            .then(function (ret) {
                $scope.totalRe = ret.total_row;
                $scope.reviews = ret.data;
                //自定义一个属性
                angular.forEach($scope.reviews,function(d){
                    d.ShowReply = false;
                    d.indexReply = [];
                    d.ReplyFormPlaceholder = '我也说一句';
                    d.ReplyFormText = ''
                })
                if (ret.total_row % ret.page_size == 0)
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                else
                    $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                $scope.currentPage = ret.page_num;
            })
        //翻页事件
        $scope.onPageChange = function () {
            $api.get("app/comment/goodComments",{good_id:$stateParams.good_id,pageNum:$scope.currentPage,pageSize:$scope.page_size},true)
                .then(function (ret) {
                    $scope.reviews = ret.data;
                    //自定义一个属性
                    angular.forEach($scope.reviews,function(d){
                        d.ShowReply = false;
                        d.indexReply = [];
                        d.ReplyFormPlaceholder = '我也说一句';
                        d.ReplyFormText = ''
                    })
                    if (ret.total_row % ret.page_size == 0)
                        $scope.pageCount = parseInt(ret.total_row / ret.page_size);
                    else
                        $scope.pageCount = parseInt(ret.total_row / ret.page_size) + 1;
                    $scope.currentPage = ret.page_num;
                });
        };

        var token = localStorageService.get('token')
        var url = 'https://api.stareal.cn/mobile/app/upload/image?accessToken='+token;//正式
        // var url = 'http://t.stareal.cn:8080/api/app/upload/image?accessToken='+token;//测试
        var uploader = $scope.uploader = new FileUploader({
            url:url,
            alias:'image',
            queueLimit:9
        });
        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        //写评论
        var oStar = document.getElementById("star");
        var aLi = oStar.getElementsByTagName("li");
        var oUl = oStar.getElementsByTagName("ul")[0];
        var i =0;
        var iScore = 0;
        var iStar = 0;
        for (i = 1; i <= aLi.length; i++)
        {
            aLi[i - 1].index = i;
            //鼠标移过显示分数
            aLi[i - 1].onmouseover = function ()
            {
                fnPoint(this.index);
                //浮动层显示
                //计算浮动层位置

            };
            //鼠标离开后恢复上次评分
            aLi[i - 1].onmouseout = function ()
            {
                fnPoint();
                //关闭浮动层
            };
            //点击后进行评分处理
            aLi[i - 1].onclick = function ()
            {
                iStar = this.index;
            }
        }
        //评分处理
        function fnPoint(iArg)
        {
            //分数赋值
            iScore = iArg || iStar;
            for (i = 0; i < aLi.length; i++) {
                aLi[i].className = i < iScore ? "on" : ""
            };
        }

        //评分
        var img_str = ''
        $scope.submit = function () {
            if (!localStorageService.get('token')) {
                $scope.$broadcast('to-child');
                return false;
            }
            var scor = iStar*2;
            if(scor==0){
                $alert.show('请打分!');
                return false;
            }
            if(!$scope.conten){
                $alert.show("请写评论!")
                return false;
            }
            if(uploader.queue.length!=0){//选择了图片
                //上传
                uploader.uploadAll()
                //上传每一个
                uploader.onSuccessItem = function(fileItem, response, status, headers) {
                    if(img_str==''||undefined){
                        img_str = response.url
                    }else{
                        img_str = img_str+','+response.url;
                    }
                };
                //上传总进度
                uploader.onProgressAll = function(progress) {
                    if(progress!=100){
                        angular.element(".img_load_mask").show();
                    }
                    if(progress==100){
                        angular.element(".img_load_mask").hide();
                    }
                };
                //全部上传成功
                uploader.onCompleteAll = function() {
                    $api.post("app/comment/create",{
                        good_id:$stateParams.good_id,
                        content:$scope.conten,
                        star:scor,
                        attach:img_str
                    },true)
                        .then(function (ret) {
                            iStar=0;
                            iScore=0;
                            img_str ='';
                            angular.element("#star li").removeClass("on");
                            uploader.clearQueue();
                            $alert.show("评论成功!")
                            $api.get("app/comment/goodComments",{good_id:$stateParams.good_id,pageNum:1,pageSize:$scope.page_size},true)
                                .then(function (ret) {
                                    $scope.conten = ''
                                    $scope.totalRe = ret.total_row;
                                    $scope.reviews = ret.data;
                                    //自定义一个属性
                                    angular.forEach($scope.reviews,function(d){
                                        d.ShowReply = false;
                                    })
                                })
                        },function (err) {
                            $alert.show(err)
                        })
                };
            }else{//没有选择图片
                $api.post("app/comment/create",{
                    good_id:$stateParams.good_id,
                    content:$scope.conten,
                    star:scor
                },true)
                    .then(function (ret) {
                        iStar=0;
                        iScore=0;
                        angular.element("#star li").removeClass("on");
                        $alert.show("评论成功!")
                        $api.get("app/comment/goodComments",{good_id:$stateParams.good_id,pageNum:1,pageSize:$scope.page_size},true)
                            .then(function (ret) {
                                $scope.conten = ''
                                $scope.totalRe = ret.total_row;
                                $scope.reviews = ret.data;
                                //自定义一个属性
                                angular.forEach($scope.reviews,function(d){
                                    d.ShowReply = false;
                                })
                            })
                    },function (err) {
                        $alert.show(err)
                    })
            }
        }
        //点赞
        $scope.IsPraise = function (CommentId,index,num) {
            if (!localStorageService.get('token')) {
                $scope.$broadcast('to-child');
                return false;
            }
            $api.post("app/comment/praise",{comment_id:CommentId},true)
                .then(function (ret) {
                    $scope.reviews[index].is_praise = !$scope.reviews[index].is_praise;
                    $scope.reviews[index].like = parseInt(ret.praise)+num;
                },function (err) {
                    $alert.show(err)
                })
        }
        //获取当前评论下所有回复
        $scope.GetReply = function (CommentId,index) {
            $scope.reviews[index].ShowReply = !$scope.reviews[index].ShowReply;
            $scope.reviews[index].ReplyFormPlaceholder ='我也说一句';
            $api.get("app/reply/retrieve",{comment_id:CommentId},true)
                .then(function (ret) {
                    $scope.reviews[index].indexReply = ret.data;
                },function (err) {
                    $alert.show(err)
                })
        }

        //点击回复他人回复
        // $scope.ReplyFormText =''
        // $scope.ReplyFormPlaceholder ='我也说一句'
        $scope.FormSumbit = function (ToId,ForNmame,index) {
            localStorageService.set("ToId",ToId)
            $scope.reviews[index].ReplyFormPlaceholder = '回复'+ForNmame+'：';
        }
        $scope.Reply = function (ReplyFormText,id,index) {
            $scope.ToId = localStorageService.get("ToId")//回复人ID
            if(!ReplyFormText){
                $alert.show("请输入回复内容")
                return false;
            }
            if($scope.reviews[index].ReplyFormPlaceholder=='我也说一句'){//新增回复
                $api.post("app/reply/create",{comment_id:id,content:ReplyFormText},true)
                    .then(function (ret) {
                        $scope.reviews[index].ReplyFormText=''
                        $scope.reviews[index].ReplyFormPlaceholder ='我也说一句';
                        $api.get("app/reply/retrieve",{comment_id:id},true)
                            .then(function (ret) {
                                $scope.reviews[index].indexReply = ret.data;
                            },function (err) {
                                $alert.show(err)
                            })
                    })
            }else{//点击别人
                $api.post("app/reply/create",{comment_id:id,to_id:$scope.ToId,content:ReplyFormText},true)
                    .then(function (ret) {
                        $scope.reviews[index].ReplyFormText=''
                        $scope.reviews[index].ReplyFormPlaceholder ='我也说一句';
                        $api.get("app/reply/retrieve",{comment_id:id},true)
                            .then(function (ret) {
                                $scope.reviews[index].indexReply = ret.data;
                            },function (err) {
                                $alert.show(err)
                            })
                    },function (err) {
                        $alert.show(err)
                    })
            }
        }

        //演出状态按钮
        $scope.btnSetColor = function (statu) {
            if(statu=='预售中'){
                $scope.defstyle = {
                    "background-color": "#4899FE"
                }
            }
            if(statu=='售票中'){
                $scope.defstyle = {
                    "background-color": "#FF2450"
                }
            }
            if(statu=='扫尾票'){
                $scope.defstyle = {
                    "background-color": "#FF5000"
                }
            }
            if(statu=='即将开票'){
                $scope.defstyle = {
                    "background-color": "#3D50F0"
                }
            }
            if(statu=='演出结束'){
                $scope.defstyle = {
                    "background-color": "#6B6B6B"
                }
            }
            if(statu=='已售罄'){
                $scope.defstyle = {
                    "background-color": "#6B6B6B"
                }
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