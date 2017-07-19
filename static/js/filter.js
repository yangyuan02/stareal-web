'use strict';

stareal.filter("buildDate", function () {
    return function (input, location) {
        if (location == 'before') {
            return input.substring(0, input.indexOf('#'));
        }

        if (location == 'after') {
            return input.substring(input.indexOf('#') + 1);
        }

        return input;
    }
});
//过滤空格
stareal.filter("trim", function () {
    return function (str) {
        return str.replace(/\s+/g,"");
    }
})
//评论过滤为数组
stareal.filter("split",function () {
    return function (str) {
        if(str!=undefined){
            return str.split(',')
        }
    }
})//去掉#号
stareal.filter("splitq", function () {
    return function (str) {
        return str.replace(/#/g,"");
    }
})