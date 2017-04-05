documentReady(function () {
//切换城市
    var city = document.getElementById('city');
    var citys = document.getElementById('citys');
    var span_inner = citys.getElementsByTagName('a');
    var city_i_b = document.getElementById('city_i_b');
    city.onmouseover = function () {
        citys.className = '';//显示城市
        for (var i = 0; i < span_inner.length; i++) {
            span_inner[i].onclick = function () {
                for (var j = 0; j < span_inner.length; j++) {
                    span_inner[j].className = '';
                }
                this.className = 'red';
                city_i_b.innerHTML = this.innerHTML;//切换城市
                citys.className = 'hiden';
            }
        }
    };
    city.onmouseout = function () {
        citys.className = 'hiden';
    };
    //搜索框
    var sear = document.getElementsByClassName('sear')[0];
    sear.onfocus = function () {
        sear.placeholder = '';
    };
    sear.onblur = function () {
        sear.placeholder = '烟灶套装';
    };
//顶部菜单
    var cont = document.getElementById('cont').children;
    //顶部菜单鼠标悬停事件
    function top_onmouseover(obj, obj_2) {
        var timer;
        obj.onmouseover = function () {
            clearTimeout(timer);
            obj_2.className = '';//显示
            obj.className = 'white';
        };
        obj.onmouseout = function () {
            timer = setTimeout(function () {
                obj_2.className = 'hiden';
            }, 100);

            obj.className = '';
        }
    }

    for (var i = 0; i < cont.length; i++) {
        var ul = cont[i].getElementsByTagName('ul')[0];
        if (ul) {
            top_onmouseover(cont[i], ul)
        }
    }
//二维码
    var td_ma = document.getElementById('td_ma');
    var td_i = document.getElementById('td_i');
    td_ma.onmouseover = function () {
        console.log(1);
        td_i.className = ''
    };
    td_ma.onmouseout = function () {
        td_i.className = 'hiden'
    }
})
