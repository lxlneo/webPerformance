/**
 * Created by neo on 2018/5/3.
 */

(function (window) {
    let currentScript = window.document.currentScript;

    function getAPPKey() {
        return  currentScript.getAttribute("key")
    }
    function buildParmars(parmars) {
        let obj = Object.assign({key: getAPPKey()}, parmars);
        let arr = [];
        Object.keys(obj).map(function (item) {
            arr.push(item + "=" + obj[item]);
        })
        return arr.join("&");
    }

    function sendRequest(parmars) {
        let img = new Image();
        img.src = "http://demo.find11now.com.jpg?" + buildParmars(parmars);
    }

    //页面加载时间
    function analysTiming() {
        let timing = window.performance.timing;
        console.log(JSON.stringify(timing));
        let result = {};
        //DNS查询耗时 ：domainLookupEnd - domainLookupStart
        result.dns = timing.domainLookupEnd - timing.domainLookupEnd;
        //TCP链接耗时 ：connectEnd - connectStart
        result.tcp = timing.connectEnd - timing.connectStart;
        //request请求耗时 ：responseEnd - responseStart
        result.request = timing.responseEnd - timing.responseStart;
        //解析dom树耗时 ： domComplete - domInteractive
        result.dom = timing.domComplete - timing.domInteractive;
        //白屏时间 ：responseStart - navigationStart
        result.dom = timing.responseStart - timing.navigationStart;
        //domready时间(用户可操作时间节点) ：domContentLoadedEventEnd - navigationStart
        result.domready = timing.domContentLoadedEventEnd - timing.navigationStart;
        //onload时间(总下载时间) ：loadEventEnd - navigationStart
        console.log(timing.loadEventEnd , timing.navigationStart);
        result.onload = timing.loadEventEnd - timing.navigationStart;

        return result;
    }

    function analysUA() {
        return {ua: window.navigator.userAgent}
    }

    function analysURL() {
        return {href: window.location.href};
    }
    function report() {
        let obj = Object.assign({},analysTiming(),analysUA(),analysURL());
        sendRequest(obj);
    }
    window.addEventListener("load", function(event) {
       setTimeout(function () {
           report()
       },0) ;
    });
})(window);
