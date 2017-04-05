/**
 * Created by hxsd on 2017/1/6.
 */

// 监听兼容函数
function documentReady(fn){
    if(document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn, false);
    }else{
        document.attachEvent('onreadystatechange', function (){//IE兼容
            if(document.readyState=='complete'){
                fn && fn();
            }
        });
    }
}

//拖拽函数
function drag(obj,tlt){
    var ele=tlt||obj;
    ele.onmousedown=function(ev){//点击ele元素时连同obj被拖动
        ev=ev||event;
        var sw=document.documentElement.clientWidth;//获取屏幕宽
        var sh=document.documentElement.clientHeight;//获取屏幕高度
        var left=ev.clientX-obj.offsetLeft;//被拖动元素左边距
        var top=ev.clientY-obj.offsetTop;//被拖动元素上边距
        document.onmousemove=function(ev){
            var x=ev.clientX-left;
            var y=ev.clientY-top;
            if(x<0){x=0}
            if(y<0){y=0}
            if(x>sw-obj.offsetWidth){x=sw-obj.offsetWidth}
            if(y>sh-obj.offsetHeight){y=sh-obj.offsetHeight}
            obj.style.left=x+"px";
            obj.style.top=y+"px";

        };

        obj.onmouseup=function(){
            document.onmousemove=null;
        };
        return false;
    };
}

//居中函数
function center(obj){
    obj.style.display="block";
    var sw=document.documentElement.clientWidth;
    var sh=document.documentElement.clientHeight;
    obj.style.left=(sw-obj.offsetWidth)/2+"px";
    obj.style.top=(sh-obj.offsetHeight)/2+"px";
    window.onsize= function () {
        center(obj)
    }
}

//documentReady(function () {
//    内容
//});

//获取子元素函数
function get_firstChild(elm){
    return elm.firstElementChild  || elm.firstChild;
}
function get_lastChild(elm){
    return elm.lastElementChild  || elm.lastChild;
}
function get_previousSibling(elm){
    return elm.previousElementSibling  || elm.previousSibling;
}
function get_nextSibling(elm) {
    return elm.nextElementSibling || elm.nextSibling;
}

//读取字节数函数
function readBytes(obj){
    function isChinese(str){//判断是否为中文
        var rech=/[u00-uff]/;
        return !rech.test(str);
    }
    obj.onkeyup= function () {
        var num=0;
        var bt_l=obj.value;
        for(var i=0;i<bt_l.length;i++){
            num+=isChinese(bt_l.charAt(i))?2:1;//中文加2字节，字符加1字节
        }
        return num=Math.round(num/2);
    };
}

//抽奖
function luckDraw(obj,li,arr,p){
    obj.onclick= function () {
        var n=0;
        timer=setInterval(function () {
            var a=parseInt(Math.random()*arr.length);
            li[n].innerHTML=arr[a];
            arr.splice(a,1);//删除被选中是元素
            n++;
            if(n==6){
                p.innerHTML=arr;
                clearInterval(timer)}
        },500);
    }
}

