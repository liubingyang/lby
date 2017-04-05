/**
 * Created by Administrator on 2017/2/26 0026.
 */
$(function () {
    //换头像
    var num=0;
    $('#icon').click(function () {
        if(num==0){
            $('#imgs').removeClass('hidden');
            num=1;
        }else {
            $('#imgs').addClass('hidden');
            num=0;
        }
    })
    $('#imgs').find('li').click(function () {
        $('#icon').find('img').attr('src',$(this).find('img').attr('src'));
        $('#imgs').addClass('hidden');
        num=0;
    })
    //搜索框
    $('form').find('input').on('focus', function () {
        $('form').find('input').attr('placeholder','')
    });
    $('form').find('input').on('blur', function () {
        $('form').find('input').attr('placeholder','输入最近联系人')
    });
    //常购清单
    $('.my_d').hover(function () {
        $(this).find('.my_f').removeClass('hidden')
    },
        function () {
            $(this).find('.my_f').addClass('hidden')
        }
    );
    //双通信
    var clientSocket=io();
    var $content=$('.content_1');
    clientSocket.on('message', function (data) {
        switch (data.type){
            case 'qs':
                $content.append('<p>京东客服为您服务：</p>');
                var $ul=$('<ul>');
                $.each(data.qs,function (index,itm) {
                    $('<li>').append('<a class="at">'+itm+'</a>').appendTo($ul);
                });
                $ul.appendTo($content);
                break;
            case 'as':
                var $div=$('<div class="com_to clear">');
                $div.append('<div>客服9527：</div><div class="word">'+data.as+'</div>');
                setTimeout(function () {
                    $div.appendTo($content);
                    $content.scrollTop($content.prop("scrollHeight"));//窗口自动下滚
                },1000);
                break;
        }
    });
    $content.on('click','a.at', function () {
        var date=new Date();
        var hour=date.getHours();
        var min=date.getMinutes();
        var $div=$('<div class="com_on clear">');
        $div.append('<div class="clear"><i><img src='+$("#icon").find("img").attr('src')+'></i>' +
            '<span>'+$('#name').html()+'</span></div><p class="time">' +
            hour+':'+min+'</p><p>'+$(this).html()+'</p>');
        $div.appendTo($content);
        clientSocket.send($(this).html());
        $content.scrollTop($content.prop("scrollHeight"));//窗口自动下滚

    });
    $('#btn').click(function () {
        var date=new Date();
        var hour=date.getHours();
        var min=date.getMinutes();
        if($('#msg').val()){
            var $div=$('<div class="com_on clear">');
            $div.append('<div class="clear"><i><img src='+$("#icon").find("img").attr('src')+'></i>' +
                '<span>'+$('#name').html()+'</span></div><p class="time">' +
                hour+':'+min+'</p><p>'+$('#msg').val()+'</p>');
            $div.appendTo($content);
            $content.scrollTop($content.prop("scrollHeight"));//窗口自动下滚
            clientSocket.send($('#msg').val());
            $('#msg').val('')
        }else {
            $content.append('<div>消息不能为空！</div>');
            $content.scrollTop($content.prop("scrollHeight"));//窗口自动下滚
        }
    });
    $('#msg').on('keydown', function (e) {
        if(e.keyCode==13){
            e.preventDefault();
            $('#btn').trigger('click')
        }
    })

});
