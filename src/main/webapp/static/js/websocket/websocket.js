/**
 * ****************************************************************************************
 * ****************************************************************************************
 *
 * @title: websocket.js
 * @description websocket
 * @param wsobj: websocket对象, wsobj.host: 普通连接, wsobj.shost: sock连接
 * @author renw
 * @date: 2017年6月6日 下午15:19:00
 *
 * ****************************************************************************************
 * ****************************************************************************************
 */

function VPTWebSocket(options) {
    var wsobj = {
        socket: null,
        host: '',
        shost: '',
        connect: function () {
            window.WebSocket = window.WebSocket || window.MozWebSocket;
            if (window.WebSocket) {
                this.socket = new WebSocket(this.host);                                 // 创建连接并注册响应函数
                //this.socket = new ReconnectingWebSocket(this.host);   //创建断线重连机制的WebSocket  
            } else {
                this.socket = new SockJS(this.shost);                                        //不支持的浏览器使用模拟
            }
            this.socket.onopen = function () {
                console.log('websocket is opened .');
            };
            this.socket.onmessage = function (websocketMsg) {
           	    // broadcasting(websocketMsg.data);                                               //广播消息（定义需要显示的消息）
            	// console.log(websocketMsg.data);
            	// 回调消息处理
                options.onmessage && options.onmessage(websocketMsg.data);
            };
            this.socket.onclose = function () {                                                      //关闭并清理 WebSocket对象
                console.log('websocket is closed .');
                wsobj.socket = null;
                //top.location.reload();
            };
            this.socket.onerror = function () {
            };
        },
        send: function (message) {                                                                     // 主动发送消息
            if (this.socket) {
                this.socket.send(message);
                return true;
            }
            console.log('please connect to the server first !!!');
            return false;
        }
    };

    // 初始化websocket连接
    wsobj.host = (window.location.protocol == 'http:') ? 'ws://' : 'wss://';
    wsobj.shost = wsobj.host + window.location.host + getCtx() + '/sockjs/webSocketServer.do';
    wsobj.host += window.location.host + getCtx() + '/webSocketServer.do';

    // 根据session状态开关连接
    if (!wsobj.socket) {
        wsobj.connect();
    } else if (wsobj.socket) {
        wsobj.socket.close();
    }

    //监听关闭窗口事件
    window.onbeforeunload = function () {
        //layer.alert('关闭窗口')
        wsobj.socket.close();
    }

    return wsobj;

};