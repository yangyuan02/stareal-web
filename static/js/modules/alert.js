'use strict';

/**
 *  fuck.!!!
 *
 */
angular.module('starealAlert', [])
    .directive('starealAlert', starealAlertDirective)
    .provider('$alert', starealAlertProvider);

starealAlertDirective.$inject = ['$alert'];
function starealAlertDirective($alert) {
    return {
        restrict: 'E',
        template: '<div ng-show="starealAlert.msg" style="text-align:center;position:fixed;left:50%;margin-left:-160px;top:50%;z-index:99999999;">' +
        '             <div class="bg"></div>' +
        '             <div class="alert" style="width:320px;height:60px;margin:0 auto;background:rgba(0,0,0,0.9);line-height:60px;border-radius:12px;">' +
        '               <div></div>' +
        '               <span style="color:#fff;font-size:14px;">{{starealAlert.msg}}</span>' +
        '             </div>' +
        '          </div>',
        link: function (scope, element, attrs) {
            scope.starealAlert = $alert;
            if (scope.starealAlert.type == undefined) {
                scope.starealAlert.type = "alert";
            }
        }
    };
}

function starealAlertProvider() {
    var self = this;

    self.timeout = 2000;
    self.setDefaultTimeout = function (defaultTimeout) {
        self.timeout = defaultTimeout;
    };

    self.$get = ['$timeout', function ($timeout) {
        var cancelTimeout = null;

        return {
            msg: null,
            show: show,
            clear: clear
        };

        function show(msg, callback, sf) {
            var that = this;
            this.msg = msg;
            this.type = 'alert';

            if (sf) {
                this.type = 'right';
            }

            if (cancelTimeout) {
                $timeout.cancel(cancelTimeout);
            }
            cancelTimeout = $timeout(function () {
                that.clear();

                if (callback) {
                    callback.apply(null, []);
                }
            }, self.timeout);
        }

        function clear() {
            this.msg = null;
        }
    }];
}