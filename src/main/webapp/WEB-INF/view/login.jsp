<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/include/taglibs.jsp" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <link rel="stylesheet" type="text/css" href="${_ctx }/static/css/public.css"/>
    <!-- <link rel="stylesheet" type="text/css" -->
    <%-- 	href="${_ctx }/static/css/login.css" /> --%>
    <title>登录</title>
</head>

<script>
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    var linkT = document.createElement('link');
    linkT.setAttribute('rel', 'stylesheet');
    linkT.setAttribute('type', 'text/css');

    if (IsPC()) {
        linkT.href = "${_ctx }/static/css/login.css";
    } else {
        linkT.href = "${_ctx }/static/css/smoll_login.css";
    }

    document.getElementsByTagName('head')[0].appendChild(linkT);
</script>

<body onkeydown="keyLogin()">
<div class="zczLoName">
    <div class="zczLoCh">视频结构化</div>
    <div class="zczLoEn">VIDEO STRUCTURE ANALYSIS</div>
</div>
<form id="login" action="">
    <div class="zczLoLogin">
        <input type="text" name="userName" id="userName" class="zczLoUs"
               placeholder="输入用户名"/> <input type="password" name="password"
                                            name="username" class="zczLoPs" placeholder="输入密码"/>
        <div class="zczLoBt">登录</div>
    </div>
</form>
<div class="zczLoCpr">
    版权所有：武汉大千信息技术有限公司 <a href="http://www.videtek.com">www.videtek.com</a>
</div>
</body>

<script src="${_ctx }/static/js/jquery.js" type="text/javascript"
        charset="utf-8"></script>
<script src="${_ctx }/static/pluginunit/layer/layer.js"
        type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    if (window != top) {
        top.location.href = location.href;
    }
    $(function () {
        $('.zczLoBt').on('click', function () {
            if ($("#userName").val() != "" && $("#password").val() != "") {
                userlogin();
            } else {
                layer.msg("账号或密码不能为空！", {
                    time: 1500
                });
            }
        });
    });

    function keyLogin() {
        var e = arguments.callee.caller.arguments[0] || window.event;
        if (e.keyCode == 13) { //回车键的键值为13
            if ($("#userName").val() != "" && $("#password").val() != "") {
                userlogin();
            } else {
                layer.msg("账号或密码不能为空！", {
                    time: 1500
                });
            }
        }
    }

    function userlogin() {
        $.ajax({
            type: "POST",
            url: "${_ctx }/login.do",
            dataType: "json",
            async: false,
            data: $("#login").serialize(),
            success: function (data) {
                if (data.code == 200) {
                    debugger
                    var obj = JSON.parse(data.data);
                    window.location.href = "${_ctx}/main.do?token=" + obj.token+"&userName="+obj.userName;
                } else {
                    layer.msg(data.message, {
                        time: 1500
                    });
                }
            },
            error: function (xhr) {
                layer.msg("服务器异常，请联系管理员！", {
                    time: 1500
                });
            }
        });
    }
</script>
</html>