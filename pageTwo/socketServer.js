/**
 * Created by xinliwei on 2016-12-09 0009.
 *
 * 消息的类型：
 *      客服发送的消息：需要发给指定的目标客户
 *      客户发送的消息：需要发给客服
 *
 * 定义好消息的格式：
 * 1. 客户可以会发送的咨询信息：
 * {
 *    type: "咨询",
 *    nickname: "小神仙",
 *    msg: "您好，神仙水什么时候到货?"
 * }
 * 2. 客服可能会回复的消息：
 * {
 *    type: "客服",
 *    nickname: "京东客服",
 *    msg: "您好，您咨询的商品，月底到货。"
 * }
 *
 * 客户端和服务器之间的数据传送格式我们采用json
 socket.io会自动将json转为js对象
 Socket.io 的发送对象范围：
 向当前客户端发送事件
 socket.emit('login', {
          numUsers: numUsers
        });
 广播（不包含当前客户端）
 socket.broadcast.emit('new message', {
          username: socket.username,
          message: data
        });
 广播（且包含当前客户端）
 io.sockets.emit('message', "this is a test");
 在房间广播（不包含当前客户端）
 socket.broadcast.to('game').emit('message', 'nice game');
 在房间广播（包含当前客户端）
 io.sockets.in('game').emit('message', 'cool game');
 发送给指定客户端
 io.sockets.sockets[socketid].emit('message', 'for your eyes only');
 就可以向一个特定用户推送消息，但是如何获得这个socketId，就是生成一个哈希数组，key为username，
 值为socket.id，这样就可以通过用户名获取对应的id，进而可以向特定client推送消息。
 */
// 引入socket.io模块
var socketIO = require("socket.io");

// 定义一个哈希数组，保存所有客户端的socket id
var clientIds = [];

// 咨询问题列表
var questions = [
    "订单服务",
    "售后服务",
    "配送服务",
    "账户服务",
    "财务服务",
    "意见与建议",
    "一起帮-您的购物助手",
    "虚拟商品",
    "乡村推广员招募"
];
var answers=[
    "您的订单不见了！",
    "清提供您的订单号",
    "正在配送，别急",
    "环境不安全，不能服务",
    "没钱要啥服务！",
    "请保留意见",
    "忙着呢。。。。。",
    "请登录主页",
    "月薪3W"
];
module.exports = function (httpServer) {
    // 让socket.io监听web服务器，并返回socket.io服务器
    var socketServer = socketIO.listen(httpServer);

    // socket服务器会监听所有客户端的连接请求
    // 当有客户端连接请求到达时，会触发一个"connect"事件
    // 每一个客户端请求，服务器端都会创建一个新的socket对象，负责和对方通信
    socketServer.on("connect", function (socket) {
        console.log("有新的客户端连接:" + socket.id);

        // 将新用户的socket.id保存到数组中
        clientIds.push(socket.id);
        console.log("connect:" + clientIds.length);

        // 将咨询问题列表发给客户端
        var msg = {
            type:"qs",          // 消息类型：qs-初始问题列表  as-应答内容
            qs:questions
        };
        socket.send(msg);
        // 向客户端发送消息:
        // 有两个方法：send-发送的是默认叫做"message"的消息,
        //             emit-发送自定义名称的消息
        // 以下方法的两个参数：参数1:消息名称;参数2:消息内容
        //socket.emit("hello","欢迎您，新朋友!");

        // 服务器socket监听客户端发过来的消息
        var carts=[];
        socket.on("message", function (data) {
            // 构造要发送的消息的数据结构
            if(data.type==0){
                carts.push(data.conunt);
                socket.send(carts)
            }
            else if(questions.indexOf(data)!=-1){
                var msg = {
                    type:"as",
                    as:answers[questions.indexOf(data)]
                };
                // 向客户端发送消息
                socket.send(msg);
            }else {
                var arr=[
                    '请说中国话!!',
                    '请说人话。。',
                    '皮皮虾，你说啥？',
                    '被发现了！！',
                    '价格微信吧！！',
                    '你是美女吗？！',
                    '请叫我小汪！！',
                    '你是不是也喜欢周杰伦！！',
                    '汪汪汪！！',
                    '哎呦，不错呦！！',
                    '今天天气不错！！',
                    '给老子GUN！！'
                ];
                var msg = {
                    type:"as",
                    as:arr[Math.round(Math.random()*11)]
                };
                // 向客户端发送消息
                socket.send(msg);
            }
        });

        // 监听客户端断开连接的事件
        socket.on("disconnect", function () {
            // 从数组中删除指定的socket.id
            clientIds.splice(clientIds.indexOf(socket.id),1);
            console.log("disconnect:" + clientIds.length);
        });
    });
};
