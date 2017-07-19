'use strict';

stareal
    .directive('accessCertification', function (localStorageService) {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                if(attrs.token != undefined && attrs.token !=null && attrs.token != ''){
                    localStorageService.set('token', attrs.token);
                }
                if(attrs.mobile != undefined && attrs.mobile !=null && attrs.mobile != '') {
                    localStorageService.set('mobile', attrs.mobile);
                }
                if (attrs.rs) {
                    localStorageService.set('rs', attrs.rs);
                }

            }
        }
    })
    .directive('goBack', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', goBack);

                function goBack() {
                    history.back();
                    // scope.$apply();
                }
            }
        }
    })
    .directive('onListFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit(attr.onListFinishRender);
                    });
                }
            }
        }
    })
    .directive('thumbSize', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var _width = element.width();
                element.height((_width - 2) * 10 / 7);
            }
        }
    })
    .directive('errSrc', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src == ''||null||undefined){
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
    })
    .directive('editAdd',function () {
        return{
            restrict:'EA',
            link:function (scope,element,attrs) {
                element.bind('click',function () {
                    var height = $(window).height();
                    $("#mask-add").css("height", height);
                    $("#mask-add").show();
                    $("#address-box").addClass("coverAniamtion");
                })
            }
        }
    })
    .directive('closeModel',function () {
        return{
            restrict:'EA',
            link:function (scope,element,attrs) {
                element.bind('click',function () {
                    $("#mask-add").hide();
                    $("#beily-model").hide();
                    $("#mask-pay").hide();
                    $("#mask").hide();
                    $(".seatmask").hide();
                    $(".mask-pay").hide();
                    $(".pubtps").fadeOut();
                })
            }
        }
    })
    .directive('stopPropagation',function () {
        return{
            restrict:'EA',
            link:function (scope,element,attrs) {
                element.bind('click',function (e) {
                    e.stopPropagation();
                })
            }
        }
    })
    .directive('thumbBox',function () {
        return{
            restrict:'EA',
            scope:{
                id:'='
            },
            link:function (scope,element,attrs) {
                element.bind('click',function () {
                        var len = $(".reply-thumb>img").length;
                        var _index = 0;
                        angular.element("."+scope.id).show();
                        angular.element(".shouImg").show();
                        angular.element(".shouImg .bigimg").attr("src",attrs.src);
                        _index = angular.element(this).index();
                    angular.element(".next").click(function(){
                        _index++;
                        if(_index>len){
                            _index=0;
                        }
                        angular.element(".shouImg .bigimg").attr("src",angular.element(".reply-thumb>img").eq(_index).attr('src'));
                    })
                    angular.element(".prev").click(function(){
                        _index--;
                        if(_index<0){
                            _index=len;
                        }
                        angular.element(".shouImg .bigimg").attr("src",angular.element(".reply-thumb>img").eq(_index).attr('src'));
                    })
                    angular.element(".gray").click(function(){
                        angular.element(this).hide();
                        angular.element(".shouImg").hide();
                    })
                })
            }
        }
    })
    //返回顶部
    .directive('backTop',function ($timeout) {
        return{
            restrict:'EA',
            link:function (scope,element,attrs) {
                element.on('click',move);
                angular.element(window).on('scroll',function(){    //监听window对象
                    checkPosition(angular.element(window).height())  //$(window).height()获取滚动的可视区高度
                });
                checkPosition(angular.element(window).height())    //避免页面刷新的时候没有执行checkPosition()这个只是在scroll方法监听中执行
                function move(){   //运动的函数
                    angular.element('html,body').animate({
                        scrollTop:0
                    },800)
                }
                function checkPosition(pos){
                    if(angular.element(window).scrollTop()>pos){ //判断当前窗口的滚动距离   pos=$(window).height()
                        element.fadeIn()
                    }else{
                        element.fadeOut()
                    }
                }
            }
        }
    })//首页签到
    .directive('signShow',function (localStorageService) {
        return{
            restrict:'EA',
            link:function (scope,element,attrs) {
                if(!localStorageService.get('token')){
                    return false;
                }
                element.hover(function () {
                    angular.element("#scs_rl").fadeIn()
                },function () {
                    angular.element("#scs_rl").fadeOut()
                })
            }
        }
    })//滚动到指定位置
    .directive('scrollTop',function () {
        return{
            restrict:'EA',
            link:function (scope,element,attrs) {
                element.click(function () {
                    var Top = angular.element(".comment-box").offset().top-angular.element(".comment").offset().top
                    angular.element('html,body').animate({
                        scrollTop:Top
                    },800)
                })
            }
        }
    })//座位信息
    .directive('showSeat',function () {
        return{
            restrict:'EA',
            link:function (scope,element,attrs) {
                element.click(function () {
                    var wHi = angular.element(window).height();
                    angular.element(".seatmask").height(wHi);
                    angular.element(".seatmask").show();
                    //等比缩放
                    var ImgD = angular.element(".seat-box img").get(0);
                    var nowW = angular.element(".seat-box img").width()
                    var nowH = angular.element(".seat-box img").height()
                    if(nowW>0 && nowH>0){
                        if(nowW/nowH>= 600/600){
                            if(nowW>600){
                                ImgD.width=600;
                                ImgD.height=(nowH*600)/nowW;
                            }else{
                                ImgD.width=nowW;
                                ImgD.height=nowH;
                            }
                        }else{
                            if(nowH>600){
                                ImgD.height=600;
                                ImgD.width=(nowW*600)/nowH;
                            }else{
                                ImgD.width=nowW;
                                ImgD.height=nowH;
                            }
                        }
                    }
                })
            }
        }
    })
    .directive('orderTime', function ($interval,$timeout,$alert,$state) {
        return {
            restrict: 'EA',
            scope:{
                orderTimeSer:'=',
                orderState:'='
            },
            template:'{{time}}',
            link:function (scope,element,attrs){
                var endTime = scope.orderTimeSer.replace(/-/gi,'/')
                var timer = null;
                function updateTime(){
                    scope.finish_time = Date.parse(new Date(endTime))+15*60*1000//结束时间
                    scope.nowTime = Date.parse(new Date())//当前时间
                    scope.time_difference =(scope.finish_time-scope.nowTime)/1000;//时差
                    if(scope.time_difference>=0){
                        scope.iDay = parseInt(scope.time_difference/86400);//算出每天
                        scope.time_difference%=86400;
                        scope.iHours = parseInt(scope.time_difference/3600)+scope.iDay*24;//算出小时
                        scope.time_difference%=3600;
                        scope.iMin = parseInt(scope.time_difference/60);//算出分钟
                        scope.time_difference%=60;
                        scope.iSec=scope.time_difference;   //算出秒
                        scope.time='剩余：'+setDigit(scope.iMin,2)+':'+setDigit(scope.iSec,2)
                    }else {
                        $interval.cancel(timer);
                        $alert.show("订单取消")
                    }
                }
                function setDigit(num,n){      //在时，分，秒前面补0
                    var str = ''+num;
                    while(str.length<n){
                        str = '0'+str;
                    }
                    return str;
                }
                if(scope.orderState=='未支付'){
                    updateTime()
                    timer = $interval(updateTime,1000)
                }
            }
        }
    })
    .directive("imgUpload",function($alert){
        return{
            //通过设置项来定义
            restrict: 'AE',
            scope: false,
            replace: true,
            link: function(scope, ele, attrs) {
                ele.bind('change', function() {
                    scope.changImg = 1;
                    scope.file = ele[0].files;
                    if(scope.file[0].size > 52428800){
                        $alert.show("图片大小不大于50M");
                        scope.file = null;
                        return false;
                    }
                    scope.fileName = scope.file[0].name;
                    var postfix = scope.fileName.substring(scope.fileName.lastIndexOf(".")+1).toLowerCase();
                    if(postfix !="jpg" && postfix !="png"){
                        $alert.show("图片仅支持png、jpg类型的文件");
                        scope.fileName = "";
                        scope.file = null;
                        scope.$apply();
                        return false;
                    }
                    scope.$apply();

                    scope.reader = new FileReader();    //创建一个FileReader接口
                    if (scope.file) {
                        //获取图片（预览图片）
                        scope.reader.readAsDataURL(scope.file[0]);    //FileReader的方法，把图片转成base64
                        scope.reader.onload = function(ev) {
                            scope.$apply(function(){
                                scope.thumb = {
                                    imgSrc : ev.target.result       //接收base64，scope.thumb.imgSrc为图片。
                                };
                            });
                        };

                    }else{
                        alert('上传图片不能为空!');
                    }
                });
            }
        };
    })
    .directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}])
    .directive('showText',function () {
        return{
            restrict:'EA',
            link:function (scope,element,attrs) {
                element.hover(function () {
                    element.find(".frist_wx").css({"display":"block"})
                    element.find(".frist_wx").animate({bottom:"0px"},200)
                },function () {
                    element.find(".frist_wx").animate({bottom:"-100px"},200,function () {
                        element.find(".frist_wx").css({"display":"none"})
                    })
                })
            }
        }
    })//首页大图
    
