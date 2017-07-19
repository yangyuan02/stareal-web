'use strict';
var loadLazyjs = function (js) {
    return {
        loadMyDirectives: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'stareal',
                files: js
            })
        }
    }
};

stareal.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {

    // $locationProvider.html5Mode(true);
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
    });

    $urlRouterProvider.otherwise('/main/index');
    $stateProvider
        .state('main', {
            url: '/main',
            template: '<div ui-view ></div>'
        })
        .state('main.index', {
            url: '/index',
            templateUrl: 'static/partials/main/index.html',
            resolve: loadLazyjs([
                'static/js/controllers/main/index.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/main.css',
                'static/css/public.css',
            ])
        })
        .state('main.list', {
            url: '/list/:kind/:sort/:direct/:keyword',
            templateUrl: 'static/partials/main/list.html',
            resolve: loadLazyjs([
                'static/js/controllers/main/list.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/list.css'
            ])
        })
        .state('main.detail', {
            url: '/detail/good/:good_id',
            templateUrl: 'static/partials/main/detail.html',
            resolve: loadLazyjs([
                'static/js/controllers/main/detail.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/detail.css',
            ])
        })
        .state('main.morereview', {
            url: '/morereview/good/:good_id',
            templateUrl: 'static/partials/main/morereview.html',
            resolve: loadLazyjs(['static/js/controllers/main/morereview.js','static/js/controllers/public/public.js'])
        })
        .state('main.create_review', {
            url: '/create_review/:good_id',
            templateUrl: 'static/partials/main/create_review.html',
            resolve: loadLazyjs(['static/js/controllers/main/create_review.js','static/js/controllers/public/public.js'])
        })
        .state('main.reply', {
            url: '/reply/:comment_id',
            templateUrl: 'static/partials/main/reply.html',
            resolve: loadLazyjs(['static/js/controllers/main/reply.js','static/js/controllers/public/public.js'])
        })
        .state('main.pay', {
            url: '/pay/:order_id?_',
            templateUrl: 'static/partials/main/pay.html',
            resolve: loadLazyjs([
                'static/js/controllers/main/pay.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/pay.css'
            ])
        })
        .state('main.pay_store', {
            url: '/pay_store/:order_id',
            templateUrl: 'static/partials/main/pay_store.html',
            resolve: loadLazyjs([
                'static/js/controllers/main/pay_store.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/pay_store.css'
            ])
        })
        .state('main.pay_succee', {
            url: '/pay_succee/:order_id',
            templateUrl: 'static/partials/main/pay_succee.html',
            resolve: loadLazyjs([
                'static/js/controllers/main/pay_succee.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/pay_state.css'
            ])
        })
        .state('main.pay_cencel', {
            url: '/pay_cencel/:order_id',
            templateUrl: 'static/partials/main/pay_cencel.html',
            resolve: loadLazyjs([
                'static/js/controllers/main/pay_cencel.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/pay_state.css'
            ])
        })
        .state('main.help', {
            url: '/help/:num',
            templateUrl: 'static/partials/main/help.html',
            resolve: loadLazyjs([
                'static/js/controllers/main/help.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/help.css'
                ])
        })
        // *******************************************  大家好,我是分割线  *******************************************

        .state('my', {
            url: '/my',
            template: '<div ui-view ></div>'
        })
        .state('my.orders', {
            url: '/orders',
            templateUrl: 'static/partials/my/orders.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/orders.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css'
            ])
        })
        .state('my.beily', {
            url: '/beily',
            templateUrl: 'static/partials/my/beily.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/beily.js',
                'static/js/controllers/public/public.js',
                'static/js/controllers/public/beily-pub.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css'
            ])
        })
        .state('my.rank', {
            url: '/rank',
            templateUrl: 'static/partials/my/rank.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/rank.js',
                'static/js/controllers/public/public.js',
                'static/js/controllers/public/beily-pub.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css'
            ])
        })
        .state('my.recover', {
            url: '/recover',
            templateUrl: 'static/partials/my/recover.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/recover.js',
                'static/js/controllers/public/public.js',
                'static/js/controllers/public/beily-pub.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css'
            ])
        })
        .state('my.favorite', {
            url: '/favorite',
            templateUrl: 'static/partials/my/favorite.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/favorite.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css',
                'static/css/list.css'
            ])
        })
        .state('my.order', {
            url: '/order/:id',
            templateUrl: 'static/partials/my/order.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/order.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/pay_state.css',
                'static/css/orders.css'
            ])
        })
        .state('my.express', {
            url: '/express/:id',
            templateUrl: 'static/partials/my/express.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/express.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css'
            ])
        })
        .state('my.coupon', {
            url: '/coupon/:status',
            templateUrl: 'static/partials/my/coupon.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/coupon.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css'
            ])
        })
        .state('my.address', {
            url: '/address',
            templateUrl: 'static/partials/my/address.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/address.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css',
                'static/css/personal.css',
            ])
        })
        .state('my.password', {
            url: '/password',
            templateUrl: 'static/partials/my/password.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/password.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css',
                'static/css/personal.css',
            ])
        })
        .state('my.personal', {
            url: '/personal',
            templateUrl: 'static/partials/my/personal.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/personal.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css',
                'static/css/personal.css',
            ])
        })
        .state('my.member', {
            url: '/member',
            templateUrl: 'static/partials/my/member.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/member.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css',
                'static/css/personal.css',
            ])
        })
        .state('my.comment', {
            url: '/comment',
            templateUrl: 'static/partials/my/comment.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/comment.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css',
                'static/css/personal.css',
            ])
        })
        .state('my.receive', {
            url: '/receive',
            templateUrl: 'static/partials/my/receive.html',
            resolve: loadLazyjs([
                'static/js/controllers/my/receive.js',
                'static/js/controllers/public/public.js',
                'static/css/reset.css',
                'static/css/public.css',
                'static/css/orders.css',
                'static/css/personal.css',
            ])
        })
        .state('my.settings_feedback', {
            url: '/settings_feedback',
            templateUrl: 'static/partials/my/settings_feedback.html',
            resolve: loadLazyjs(['static/js/controllers/my/settings_feedback.js','static/js/controllers/public/public.js'])
        })
        .state('my.settings_problems', {
            url: '/settings/problems',
            templateUrl: 'static/partials/my/settings_problems.html'
        })
        .state('my.settings_about', {
            url: '/settings/about',
            templateUrl: 'static/partials/my/settings_about.html'
        })
}])
    .run(['$rootScope', '$state', 'localStorageService', function ($rootScope, $state, localStorageService) {
        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
            window.scrollTo(0,0);
            var stateName = toState.name;

            // 拦截以下路由,身份验证
            if (stateName == 'main.pay' || stateName.indexOf('my') == 0) {
                if (!localStorageService.get('token')) {
                    evt.preventDefault();

                    var rs = "";
                    if (stateName == 'main.ticket') {
                        rs = "main.detail-" + JSON.stringify({good_id: toParams.good_id});//62161655
                    }

                    var ua = window.navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
                            "appid=wxd39f7e740343d507&" +
                            "redirect_uri=http%3A%2F%2Fwww.stareal.cn%2Fwx%2Foauth%2Findex" +
                            "&response_type=code&scope=snsapi_userinfo&state=" + encodeURIComponent(rs);
                    } else {
                        // location.href = "https://open.weixin.qq.com/connect/qrconnect?" +
                        //     "appid=wx05c47c7db58b03aa&" +
                        //     "redirect_uri=http%3A%2F%2Fwww.stareal.cn%2Fwx%2Foauth%2Fweixin" +
                        //     "&response_type=code&scope=snsapi_login&state=" + encodeURIComponent(rs) + "#wechat_redirect";
                        location.href = "#/main/login/" + encodeURIComponent(rs);
                    }
                }
            }

            if (localStorageService.get('mobile')) {
                $rootScope.tel = localStorageService.get('mobile');
            }
            if (localStorageService.get('token')==null) {
                $rootScope.tel = false;
            }
        });

    }])