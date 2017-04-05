
$(function () {
//左边菜单
    var aside=document.getElementsByClassName('aside')[0];
    var pup=document.getElementById('pup');
    aside.onmouseover= function () {
        pup.className=''
    };
    aside.onmouseout= function () {
        pup.className='hiden'
    };
    //菜单对应显示
    var section=document.getElementsByClassName('section');
    var aside_=document.getElementById('aside').children;
    for(var i= 0;i<aside_.length;i++){
        var timer;
        aside_[i].index=i;
        aside_[i].onmouseenter= function () {
            for(var j=0;j<section.length;j++){
                section[j].className='section hiden';
            }
            section[this.index].className='section';
            this.className='white';
        };
        aside_[i].onmouseleave= function () {
            var _this=this;
            timer=setTimeout(function () {
                aside_[_this.index].className='';
            },5);
            pup.onmouseenter= function () {
                clearTimeout(timer)
            };
            pup.onmouseleave= function () {
                timer=setTimeout(function () {
                    aside_[_this.index].className='';
                },5)
            }
        };
    }
    //跳转客服页面
    $('#kefu').find('li:eq(2)').click(function () {
        window.location.href='kefu.html'
    });
//轮播图
    var banner_a=document.getElementById('banner');//整个轮播图区域
    var banner=document.getElementById('banner').children;
    var banner_i=document.getElementById('banner_i');
    //按钮区
    for(var i=0;i<banner.length;i++){
        var i_=document.createElement('i');
        banner_i.appendChild(i_);
    }
    var i_i=banner_i.getElementsByTagName('i');//下按钮
    i_i[0].className='red';
    for(var i=0;i< i_i.length;i++){
        i_i[i].index=i;
        i_i[i].onmouseenter= function () {
            for(var i=0;i<banner.length;i++){
                banner[i].className='hiden';
                i_i[i].className='';
            }
            banner[this.index].className='';
            i_i[this.index].className='red';
            num_1=this.index;
        };
    }
    //自动播放
    var timer_1;
    var num_1=0;
    function run_1(){
        timer_1=setInterval(function () {
            num_1++;
            if(num_1>banner.length-1){num_1=0;}
            for(var i=0;i<banner.length;i++){
                banner[i].className='hiden';
                i_i[i].className='';
            }
            banner[num_1].className='';
            i_i[num_1].className='red';
        },2000)
    }
    run_1();
    //左右翻
    var pre=document.getElementById('pre');
    var next=document.getElementById('next');
    pre.onclick= function () {
        num_1--;
        if(num_1<0){num_1=banner.length-1;}
        for(var i=0;i<banner.length;i++){
            banner[i].className='hiden';
            i_i[i].className='';
        }
        banner[num_1].className='';
        i_i[num_1].className='red';
    };
    next.onclick= function () {
        num_1++;
        if(num_1>banner.length-1){num_1=0;}
        for(var i=0;i<banner.length;i++){
            banner[i].className='hiden';
            i_i[i].className='';
        }
        banner[num_1].className='';
        i_i[num_1].className='red';
    };
    banner_a.onmouseenter=pre.onmouseenter=banner_i.onmouseenter=next.onmouseenter= function () {
        clearInterval(timer_1);
        pre.className='';
        next.className='';
    };
    banner_a.onmouseleave= function () {
        run_1();
        pre.className='hiden';
        next.className='hiden';

    };
//右边新闻
    var l_news_t=document.getElementById('l_news_t').children;
    var l_news_b=document.getElementById('l_news_b').children;
    var line=document.getElementById('line');
    for(var i=0;i<l_news_t.length;i++){
        l_news_t[i].index=i;
        l_news_t[i].onmouseover= function () {
            for(var j=0;j<l_news_b.length;j++){
                l_news_b[j].className='hiden';
            }
            l_news_b[this.index].className='';
            line.style.left=this.index*40+'px';
        }
    }
//京东秒杀
    var time_i=document.getElementsByClassName('time_i');
    var jd_miao_i=document.getElementById('jd_miao_i').children;
    function time_1(){
        var num_2=5;
        var num_3=0;
        setInterval(function () {
            num_2--;
            for(var i=0;i<jd_miao_i.length;i++){
            }
            if(num_2<0){
                num_3++;
                if(num_3%2==0){
                    jd_miao_i[0].className='';
                    jd_miao_i[1].className='hiden'
                }else {
                    jd_miao_i[0].className='hiden';
                    jd_miao_i[1].className=''

                }
                num_2=5;
            }
            time_i[2].innerHTML='0'+num_2;
        },1000)
    }
    time_1();
//选项卡
    //获取楼层
    var article = document.getElementById('article').children;
    function Art(obj) {
        this.tit = obj.getElementsByClassName('tit')[0].children;
        this.right = obj.getElementsByClassName('right');
        for(var j=0;j<this.tit.length;j++){
            if(!this.right[j]){
                for(var i=1;i<this.tit.length;i++){
                    var _div=document.createElement('i');
                    _div.className='right clear hiden';
                    _div.innerHTML='('+this.tit[i].innerHTML+')'+'抱歉！没有内容 !';
                    obj.appendChild(_div)
                }
            }
        }
    }
    //悬停切换下图
    Art.prototype.onmouseenter = function () {
        for (var i = 0; i < this.tit.length; i++) {
            var _this = this;
            (function (index) {
                _this.tit[i].onmouseenter = function () {
                        for (var j = 0; j < _this.tit.length; j++) {
                            _this.tit[j].className = '';
                            _this.right[j].className='right clear hiden'
                        }
                        _this.tit[index].className = 'first';
                        _this.right[index].className='right clear'
                    }
            })(i)
        }
    };

    //使每个楼层都能点
    for(var i=0; i<article.length;i++){
        arr = new Art(article[i]);
        arr.onmouseenter();
    }
//获取12个楼层，结构问题，重新获取
    var fl=document.getElementsByClassName('oneF');
    var ul=document.getElementById('_aside');
    var asd=document.getElementById('_aside').children;

    //计算offsetTop
    function offsetTop(obj){
        var top = obj.offsetTop;
        var parent = obj.offsetParent;
        while( parent != null ){
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return top;
    }
    //绑定滚动事件
    window.onscroll= function () {
        var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
        for(var i=0;i<fl.length;i++){
            fl[i].top=offsetTop(fl[i]);//将每层的offsetTop记录
            if(scrolltop>fl[i].top-100){
                Red.call(asd[i],i)
            }
        }
        if(scrolltop>fl[0].top-300&&scrolltop<fl[fl.length-1].top+200){
            ul.style.display='block';
        }
        else{
            ul.style.display='none';
        }
    };
    //绑定点击事件
    for(var i=0;i<asd.length;i++){
        asd[i].index=i;
        asd[i].onclick= function () {
            clearInterval(timers);
            var start=document.documentElement.scrollTop || document.body.scrollTop;
            var end=fl[this.index].top;
            move2(start,end)
        }
    }
    //样式改变函数
    function Red(i){
        for(i=0;i<asd.length;i++){
            asd[i].className='';
        }
        this.className='red';

    }
    //滚动独有函数
    var timers;
    function move2(start,end){
        var dis=end-start;
        var count=parseInt(1000/30);
        var n=0;
        clearInterval(timer);
        timers=setInterval(function(){
            n++;
            var a=1-n/count;
            var step_dis=start+dis*(1-a*a*a*a);
            window.scrollTo(0,step_dis);
            if(n==count){
                clearInterval(timers);
            }
        },30)
    }


});